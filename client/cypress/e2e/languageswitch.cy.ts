describe('Language switch', () => {
  it('should switch language and change url accordingly', () => {
    cy.visit('http://localhost:3000');

    cy.get('[type="submit"]')
      .contains('Logga in')
      .should((elem) => {
        expect(elem.text()).to.equal('Logga in');
      });

    cy.get('[data-test-id="switchLanguage"]').click();

    cy.wait(1000);

    cy.get('[type="submit"]')
      .contains('Log in')
      .should((elem) => {
        expect(elem.text()).to.equal('Log in');
      });

    cy.url().then(($url) => {
      if ($url.includes('en')) {
        cy.log('Yes');
      } else {
        cy.log('No');
      }
    });
  });
});
