// Testing the navigation bar componanent
describe('Navigation bar', () => {
  // Test to check if the navigation bar has the correct label text
  it('contains the text in the label', () => {
    cy.visit('http://localhost:5173/') // going to the apps root url
    cy.get('nav').find('label.logo').should('have.text', 'SearchCountries') // find the label with the class 'logo' and making sure it contains 'searchCountries'
  })
});

// Test for Input Form component
describe('Input Form Componant', () => {
  // Testing if a user can type into the input field
  it('allows a user to type in a country name', () => {
    cy.visit('http://localhost:5173/');
    cy.get('input[placeholder="Search for a Country?"]')
    .type('France') // types France into the input field 
    .should('have.value', 'France')
  });
});

// Testing Countries Page componant
describe('CountriesPage Component', () => {
  // Test to check for error when a country that doesn't sexist is searched
  it('displays an error for a non-existent country', () => {
    cy.visit('http://localhost:5173/');
    cy.get('input[placeholder="Search for a Country?"]').type('BikiniBottom{enter}'); // non existent country and then {enter} is for pressing the enter key
    cy.get('.alert').should('contain', 'Country not found. Try another search'); // checking for the alert containing the error message
  });

  // Test to check if the country data is displayed after search
  it('displays country data for valid country', () => {
    cy.visit('http://localhost:5173/');
    cy.get('input[placeholder="Search for a Country?"]').type('France{enter}'); // typing in a valid country and pressing enter
    cy.get('.wrapper').should('be.visible'); // check if the wrapper for country data is visible
    cy.get('.text-box').should('contain', 'Capital:'); // verifies that the text box contains 'Capital'
    cy.get('.text-box').should('contain', 'Region:'); // verifies that the text box contains 'Region'
    cy.get('.text-box').should('contain', 'Subregion:'); // verifies that the text box contains 'Subregion'
  });
})

// Testing the Countries List component
describe('CountriesList Component', () => {
  // Test to check if the list of countries is displayed when the button is clicked
  it('shows a list of countries when "Show all Countries" is clicked', () => {
    cy.visit('http://localhost:5173/');
    cy.get('button').contains('Show all Countries').click(); // clicks the button to show all countries
    cy.get('.country-info').should('have.length.greaterThan', 0); // verifies that at least one country info block is displayed
  });

  // Test to check if country info contains necessary details
  it('has necessary information for each country', () => {
    cy.visit('http://localhost:5173/');
    cy.get('button').contains('Show all Countries').click(); // Clicks the button to show all countries
    cy.get('.country-info').first().as('firstCountry'); // aliasing the first country info block for further assertions
    cy.get('@firstCountry').find('h2').should('not.be.empty'); // verifies that the country name is not empty
    cy.get('@firstCountry').find('p').should('have.length', 3); // verifies 3 exact paragraphs, capital, region, and subregion
    cy.get('@firstCountry').find('img').should('be.visible'); // verifies that the country flags image is visible
  });
});

// Testing the toggle functionality of the countries list
describe('Toggle Countries List', () => {
  // Test to check if the countries list can be toggled on and off
  it('toggles the visibility of the countries list', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('button', 'Show all Countries').should('be.visible').as('toggleButton'); // Finding and alias the toggle button
    cy.get('@toggleButton').click(); // clicking button to show countries
    cy.get('.country-info').should('be.visible');  // verifying the countries list is visible
    cy.get('@toggleButton').click();
    cy.get('.country-info').should('not.exist'); // verrifying countries list is not visible
  });
});






