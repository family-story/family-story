describe('My First Test', function (){
  it ('Does not do much!', function(){
    expect (true).to.equal(true)
  })
})

describe('My First Test 2', function(){
  it('finds the content  "type"', function(){
    cy.visit('https://example.cypress.io')

    cy.contains('type')
  })
})