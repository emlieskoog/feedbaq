describe('Login', () => {
  it('should send sign in request and generate cookie', () => {
    const email = 'your_email@hiq.se';
    const password = '123123';

    cy.login({ email, password });

    cy.getCookie('jwt').should('exist');
  });

  it('should get profile info after login', () => {
    const email = 'your_email@hiq.se';
    const password = '123123';

    cy.login({ email, password });

    cy.request({
      method: 'GET',
      url: '/api/profile', // baseUrl is prepend to URL
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.name).to.equal('testing');

      expect(response.body.role).to.equal('SALES');
      expect(response.body.forms.length).to.equal(0);
      console.log(response.body);
    });

    cy.get('[data-test-id="profileName"]')
      .contains('testing')
      .should((elem) => {
        expect(elem.text()).to.equal('testing');
      });
  });
});
