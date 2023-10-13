/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
// commands.ts
// export default function addCustomCommands() {
//   Cypress.Commands.add('login' as any, (username, password) => {
//     // Make a request to your login endpoint to obtain a JWT token
//     cy.request({
//       method: 'POST',
//       url: '/api/auth/sign-in', // baseUrl is prepend to URL
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: {
//         email: 'your_email@hiq.se',
//         password: '123123',
//       },
//     }).then((response) => {
//       expect(response.status).to.equal(200);
//     });
//   });
// }
