import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import BlogPost from './BlogPost';
import userEvent from '@testing-library/user-event';
import blogService from '../services/blogs';

describe('Blog', () => {
  const blog = {
    title: 'test blog',
    author: 'test author',
    url: 'test URL',
    likes: 0,
    user: {
      name: 'test user',
    },
  };

  let container;

  beforeEach(() => {
    container = render(<BlogPost blog={blog} />).container;
  });

  test('renders blog title', () => {
    const title = screen.getByText('test blog');
    expect(title).toBeDefined();
  });

  test('clicking the like button twice calls event handler twice', async () => {
    //'updateLikes' is internal in BlogPost, not passed as props so jest.spyon needs to be used
    const spyUpdate = jest
      .spyOn(blogService, 'update')
      .mockImplementation((id, blogObject) => {
        blog.likes += 1;
      });

    const user = userEvent.setup();
    const showButton = screen.getByText('Show');
    await user.click(showButton);

    const likeButton = screen.getByText('Like');

    await user.click(likeButton);
    await user.click(likeButton);

    expect(spyUpdate).toHaveBeenCalledTimes(2);
    expect(blog.likes).toBe(2);

    spyUpdate.mockRestore();
  });
});
