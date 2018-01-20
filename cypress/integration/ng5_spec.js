const { clockMaker } = require('./shared');

describe('Kitchen Sink', function () {

  it ('Project on Angular 5 must work proprely', function () {
    cy.visit('http://localhost:12002');
    cy.title().should('include', 'Ng5TestBed')
    cy.get('#test-bed-directive').click();
    for (const number of clockMaker('hour')) {
      cy.get('.time-picker-clock').click(number.top, number.left);
      cy.wait(50);
    }
    cy.get('.atp-ref-dialog-close').click();
    cy.wait(100);
    cy.get('#test-bed-directive').should('have.value', '09:16');
  });
});