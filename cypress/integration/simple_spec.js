describe('My First Test', function() {
  it('visits my webpage', function() {
    cy.visit('http://localhost:3000/home');

    // cy.contains('LOGIN').click();
  })
})