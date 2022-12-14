/// <reference types="cypress" />
require("dotenv").config();
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



Cypress.Commands.add('login', (overrides = {}) => {
  Cypress.log({
    name: 'loginViaAuth0',
  });

  const options = {
    method: 'POST',
    url: 'https://dev-mujh303ammb4fy01.uk.auth0.com/oauth/token',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    body: {
      grant_type: 'password',
      username: 'test@gmail.com',
      password: 'Test1234$',
      audience: 'https://amaze-thing-dev.com',
      scope: 'read:sample',
      client_id: "O94ycBixGyrF1fRoyebadt9aJf7MzyRA",
      client_secret: "H3febBUZXNSsGbUXguJpU4SAlafEBR3oxH_8niIcGKmUg6q78_ZqBvwTJRhvCDVZ",
    },
  };
  cy.request(options);
});