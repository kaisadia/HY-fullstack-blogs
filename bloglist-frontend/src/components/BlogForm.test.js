import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';
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

  const mock = jest.fn();

  let container;

  beforeEach(() => {
    container = render(
      <BlogForm
        blog={blog}
        setMessage={mock}
        setError={mock}
        setTitle={mock}
        setAuthor={mock}
        setUrl={mock}
      />
    ).container;
  });

  test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const mockResponse = { data: { ...blog, id: '123' } };
    const spyCreate = jest
      .spyOn(blogService, 'create')
      .mockResolvedValue(mockResponse);

    const user = userEvent.setup();
    const addButton = screen.getByText('Add');

    await user.click(addButton);
    expect(spyCreate).toHaveBeenCalledTimes(1);
    spyCreate.mockRestore();
  });
});
