//functional tests

describe('Finds Content Home Page', function(){
  it('finds the content  "stories"', function(){
    cy.visit('http://localhost:3000/home')

    cy.contains('Stories')
  })

  it('searches stories by tag', function(){
    cy.get('.search-input').type('fake story search').should('have.value', 'fake story search')
  })
})

describe('clicks story and re-directs', function(){
  it('clicks story', function(){
    cy.get('#add-story-test-id').contains('Add Story').click()

    cy.url().should('include','/createStory')
  })
})

describe('story editor', function(){
  it('inputs story title', function(){
    cy.get('.story-title-input').type('fake title').should('have.value', 'fake title')
  })
})

describe('story editor', function(){
  it('inputs tags', function(){
    cy.get('.story-tags-input').type('fake tag').should('have.value', 'fake tag')

    cy.get('.add-tag-button').click()
  })
})

describe('add button works and redirects', function(){
  it('clicks save', function(){
    cy.get('.story-save-button').click()
  })
})
