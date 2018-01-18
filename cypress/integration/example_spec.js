const clockMaker = (type = 'minute') => {

  const items = [];
  const timeVal = (type === 'minute') ? 60 : 12;
  const timeStep = (type === 'minute') ? 5 : 1;
  const timeStart = (type === 'minute') ? 0 : 1;

  const r = 124;
  const j = r - 25;

  for (let min = timeStart; min <= timeVal; min += timeStep) {
    if (min !== 60) {
      const str = String (min);
      const x = j * Math.sin(Math.PI * 2 * (min / timeVal));
      const y = j * Math.cos(Math.PI * 2 * (min / timeVal));

      items.push({
        time: str,
        left: (x + r - 17),
        top: (-y + r - 17),
        type
      });
    }
  }
  return items;
}

describe('Kitchen Sink', function () {
  it('Open dialog and selecting a time must update input via directive', function () {

    cy.window().then((win) => {
      cy.spy(win.console, "log")
    })

    cy.visit('http://localhost:4200')

    cy.get('button.test-open-dialog').click();
    cy.get('#time-picker-wrapper').should('have.class', 'dark');

    for (const number of clockMaker('hour')) {
      cy.get('.time-picker-clock').click(number.top, number.left);
      cy.wait(50);
    }
    cy.get('.atp-ref-dialog-close').click();
    cy.wait(100);
    cy.get('#atp-ref-dialog-result').should('have.value', '21:20');
    
  })
});