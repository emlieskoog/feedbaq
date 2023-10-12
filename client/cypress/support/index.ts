// Custom commands
Cypress.Commands.add('login', (email: string, password: string) => {
  // Make a request to your login endpoint to obtain a JWT token
  cy.visit('http://localhost:3000');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);

  // Click the login button
  cy.get('button[type="submit"]').click();

  cy.request({
    method: 'POST',
    url: '/api/auth/sign-in', // baseUrl is prepend to URL
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      email: email,
      password: password,
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
  });
});

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       *
       * @param args
       * @returns
       */
      login: (arg1: string, arg2: string) => Chainable<JQuery<HTMLElement>>;
      clickOutside: () => void;
    }
  }
}
