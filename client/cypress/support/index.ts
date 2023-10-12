// index.ts
type LoginCommandArgs = {
  email?: string;
  password?: string;
};

Cypress.Commands.add('login' as any, (info: any) => {
  // Make a request to your login endpoint to obtain a JWT token
  cy.visit('http://localhost:3000');
  cy.get('input[name="email"]').type('your_email@hiq.se');
  cy.get('input[name="password"]').type('123123');

  // Click the login button
  cy.get('button[type="submit"]').click();

  cy.request({
    method: 'POST',
    url: '/api/auth/sign-in', // baseUrl is prepend to URL
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      email: info.email,
      password: info.password,
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
      login: (args?: LoginCommandArgs) => Chainable<JQuery<HTMLElement>>;
      clickOutside: () => void;
    }
  }
}
