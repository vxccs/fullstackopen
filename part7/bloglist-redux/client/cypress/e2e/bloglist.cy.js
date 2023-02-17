describe('bloglist', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    cy.visit('');
  });

  it('login form is shown', function () {
    cy.contains('log in to application');
  });

  describe('logging in', function () {
    beforeEach(function () {
      cy.signup({ name: 'testing', username: 'testing', password: 'secret' });
    });

    it('is successful with right credentials', function () {
      cy.login({ username: 'testing', password: 'secret' });

      cy.contains('bloglist');
      cy.contains('testing logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testing');
      cy.get('#password').type('wrong');
      cy.contains('login').click();

      cy.get('.alert')
        .should('contain', 'invalid username or password')
        .should('have.css', 'background-color', 'rgb(248, 215, 218)');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.signup({ name: 'testing', username: 'testing', password: 'secret' });
      cy.login({ username: 'testing', password: 'secret' });
    });

    describe('adding a blog', function () {
      it('is successful', function () {
        const note = {
          title: 'testing note',
          author: 'testing author',
          url: 'testing url',
        };

        cy.contains('new blog').click();
        cy.get('#title').type(note.title);
        cy.get('#author').type(note.author);
        cy.get('#url').type(note.url);
        cy.get('#create-btn').click();

        cy.get('.alert')
          .should('contain', `a new blog \'${note.title}\' by ${note.author} has been added`)
          .should('have.css', 'background-color', 'rgb(209, 231, 221)');
        cy.contains(`${note.title} by ${note.author}`);
      });
    });

    describe('when there is already blogs', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'testing blog', author: 'testing author', url: 'testing url' });
        cy.createBlog({ title: 'testing blog 2', author: 'testing author 2', url: 'testing url 2' });
        cy.createBlog({ title: 'testing blog 3', author: 'testing author 3', url: 'testing url 3' });
      });

      it('user can like a blog', function () {
        cy.contains('testing blog').contains('view').click();
        cy.contains('testing blog').parent().contains('like').click();
      });

      it('user can delete their blog', function () {
        cy.contains('testing blog').contains('view').click();
        cy.contains('testing blog').parent().contains('delete').click();

        cy.get('.alert')
          .should('contain', `"testing blog" has been deleted`)
          .should('have.css', 'background-color', 'rgb(209, 231, 221)');
      });

      it('other user cannot see delete button', function () {
        cy.contains('logout').click();

        cy.signup({ name: 'testing2', username: 'testing2', password: 'secret' });
        cy.login({ username: 'testing2', password: 'secret' });

        cy.contains('testing blog').contains('view').click();
        cy.contains('testing blog').parent().should('not.contain', 'delete');
      });

      it('blogs are organised by likes', function () {
        cy.contains('testing blog 2').contains('view').click();
        cy.contains('testing blog 2').parent().contains('like').click().click().click();

        cy.contains('testing blog 3').contains('view').click();
        cy.contains('testing blog 3').parent().contains('like').click().click();

        cy.get('.blog').eq(0).should('contain', 'testing blog 2 by testing author 2');
        cy.get('.blog').eq(1).should('contain', 'testing blog 3 by testing author 3');
        cy.get('.blog').eq(2).should('contain', 'testing blog by testing author');
      });
    });
  });
});
