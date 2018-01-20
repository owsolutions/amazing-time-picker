const { clockMaker } = require('./shared');

describe('Kitchen Sink', function () {
  it('Open dialog and selecting a time must update input via directive', function () {

    cy.visit('http://localhost:8080');
    cy.title().should('include', 'Amazing TimePicker')
    cy.get('button.test-open-dialog').click();
    for (const number of clockMaker('hour')) {
      cy.get('.time-picker-clock').click(number.top, number.left);
      cy.wait(50);
    }
    cy.get('.atp-ref-dialog-close').click();
    cy.wait(100);
    cy.get('#atp-ref-dialog-result').should('have.value', '09:00');
  
  });

});