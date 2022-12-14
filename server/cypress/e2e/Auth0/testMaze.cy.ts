/// <reference types="cypress" />

context('Maze Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/game', { timeout: 3000 });
        cy.wait(4000);
    })
    it('Place a minion, order it to move', () => {

        cy.get('#store-button').click();
        cy.wait(400);
        cy.get('#first-minion-buy').click();
        cy.wait(400);
        cy.get('#1136').rightclick();
        cy.wait(30000);
        cy.get('#text-reverse-nope').should('should.have','1');
    });

});