/// <reference types="cypress" />

describe('login',
  () => {
  it('should successfully log into our app', () => {
    cy.login()
      .then((resp) => {
        return resp.body;
      })
      .then((body) => {
        const {access_token, expires_in, id_token} = body;
        const auth0State = {
          nonce: '',
          state: 'some-random-state'
        };
        const callbackUrl = `http://localhost:5173/callback#access_token=${access_token}&scope=openid&id_token=${id_token}&expires_in=${expires_in}&token_type=Bearer&state=${auth0State.state}`;
        cy.visit(callbackUrl, {
          onBeforeLoad(win) {
            win.document.cookie = 'com.auth0.auth.some-random-state=' + JSON.stringify(auth0State);
          }
        });
      })
      cy.wait(500)
    cy.get('#login').click();
    cy.wait(500)
    cy.get('#profile').click();
    cy.wait(500)
    cy.get('#changeMe-profile').click();
    cy.wait(500)
    cy.get('#input-username-profile').type('test user');
    cy.wait(500)
    cy.get('#change-username-profile').click();
    cy.wait(500)
    cy.get('#username').contains('HELLO test user,');
    cy.wait(500)
  });

});