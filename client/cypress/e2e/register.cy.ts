describe('Create a new user', () => {


  it('succedes with an email not registred before', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-cy=registerLink]').click();
    cy.get('[data-cy=registerDialog]').should('be.visible');

    const registeredEmail = 'testtesttest@hiq.se';

    cy.get('[data-cy="registerEmail"]').type(registeredEmail)

    cy.get('[data-cy="registerPassword"]').type('123123')
    cy.get('[data-cy="registerName"]').type('Demo')

    cy.get('[data-cy="registerSubmit"]').click();
    cy.get('[data-cy="registerSuccessSnackbar"]').should('be.visible');

    cy.request({
      method: 'POST',
      url: `http://localhost:8080/api/auth/remove-user/${registeredEmail}`,
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(200);
    });

  })

  it('fails with an email registred before', () => {

    cy.visit('http://localhost:3000/')

    cy.get('[data-cy=registerLink]').click();
    cy.get('[data-cy=registerDialog]').should('be.visible');

    cy.get('[data-cy="registerEmail"]').type('demo@hiq.se')
    cy.get('[data-cy="registerPassword"]').type('123123')
    cy.get('[data-cy="registerName"]').type('Demo')
    cy.get('[data-cy="registerSubmit"]').click()
    cy.get('[data-cy="registerErrorSnackbar"]').should('be.visible');

  })


})