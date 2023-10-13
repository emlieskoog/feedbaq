describe('Login', () => {
  beforeEach(() => {
    cy.login('your_email@hiq.se', '123123');
  });

  it('should access account page and set auth cookie', () => {
    cy.url().should('include', '/account');

    cy.getCookie('jwt').should('exist');
  });

  it('should get profile info after login', () => {
    cy.request({
      method: 'GET',
      url: '/api/profile', // baseUrl is prepend to URL
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.name).to.equal('testing');
      expect(response.body.role).to.equal('SALES');
      expect(response.body.forms.length).to.equal(0);
    });

    cy.get('[data-test-id="profileName"]')
      .contains('testing')
      .should((elem) => {
        expect(elem.text()).to.equal('testing');
      });
  });
});
