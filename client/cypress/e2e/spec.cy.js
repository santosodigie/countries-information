describe('Navigation bar', () => {
  it('contains the text in the label', () => {
    cy.visit('http://localhost:5173/')
    cy.get('nav').find('label.logo').should('have.text', 'SearchCountries')
  })
});

describe('Input Form Componant', () => {
  it('allows a user to type in a country name', () => {
    cy.visit('http://localhost:5173/');
    cy.get('input[placeholder="Search for a Country?"]')
    .type('France')
    .should('have.value', 'France')
  })
});


