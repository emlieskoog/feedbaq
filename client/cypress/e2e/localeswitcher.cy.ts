describe('template spec', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:8080'); // change URL to match your dev URL
  });
  it('p asses', () => {
    cy.visit('http://localhost:3000/account');
  });
});

export {};
