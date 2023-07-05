describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`); //'backend' määritellään cypress.config.js tiedostossa
    const user = {
      name: 'Kaisa Diakhate',
      username: 'kaisad',
      password: 'salasana',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Please login');
    cy.contains('Username');
    cy.contains('Password');
  });

  describe('Login', function () {
    it('succeeds with right credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('kaisad');
      cy.get('#password').type('salasana');
      cy.get('#login-button').click();
      cy.contains('Welcome Kaisa Diakhate');
    });

    it('fails with wrong credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('kaisad');
      cy.get('#password').type('vääräsalasana');
      cy.get('#login-button').click();
      cy.contains('Wrong credentials');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'kaisad', password: 'salasana' });
    });

    it('A blog can be created', function () {
      cy.contains('Create').click();
      cy.get('#title').type('new blog post');
      cy.get('#author').type('Kaisa');
      cy.get('#url').type('www.test.com');
      cy.contains('Add').click();

      cy.contains('new blog post');
      cy.contains('Kaisa');
      cy.contains('www.test.com');
      cy.contains('Blog post added!');
    });

    describe('A blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'blog with second most likes',
          url: 'test url',
          author: 'test author',
          likes: 5,
        });
        cy.createBlog({
          title: 'blog with third most likes',
          url: 'test url',
          author: 'test author',
          likes: 3,
        });
        cy.createBlog({
          title: 'blog with most likes',
          url: 'test url',
          author: 'test author',
          likes: 7,
        });
      });
      it('blog can be liked', function () {
        cy.contains('Show').click();
        cy.contains('Like').click();
      });

      it('blog can be deleted', function () {
        cy.contains('Show').click();
        cy.contains('Remove').click();
      });

      it('blogs are sorted based on most likes', function () {
        cy.get('.blogs').eq(0).should('contain', 'blog with most likes');
        cy.get('.blogs').eq(1).should('contain', 'blog with second most likes');
        cy.get('.blogs').eq(2).should('contain', 'blog with third most likes');
      });
    });
  });
});
