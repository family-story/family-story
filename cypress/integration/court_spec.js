describe('Add a story title', function () {
  it('goes to storyEditor', function () {
    cy.visit('http://localhost:3000/createstory');
  })
  it('can add a story title', function () {
    cy.get('.story-title-block > input').type('My Test Title').should('have.value', 'My Test Title')
  })
})

describe('Adding and removing tags', function () {
  it('goes to storyEditor', function () {
    cy.visit('http://localhost:3000/createstory')
  })
  it('can write in input', function () {
    cy.get('.tags-block > input').type('Fred Test').should('have.value', 'Fred Test')
  })
  it('add button adds tag', function() {
    cy.get('.tags-block > button').click()
    cy.get('.tags-block p').should('contain', 'Fred Test')
  })
  it('removes tag when clicked', function() {
    cy.get('.tags-block p').click()
    cy.get('.tags-block > div').should('not.contain', 'Fred Test')
  })
})

describe('Adding events', function() {
  it('goes to storyEditor', function() {
    cy.visit('http://localhost:3000/createstory')
  })
  it('adds an event', function() {
    cy.get('.add-event-button').click()
    cy.get('.event-title').type('Test Event 1')
    cy.get('.save-button').click()

    cy.get('.add-event-button').click()
    cy.get('.event-title').type('Test Event 2')
    cy.get('.save-button').click()

    cy.get('.add-event-button').click()
    cy.get('.event-title').type('Test Event 3')
    cy.get('.save-button').click()

    cy.get('.add-event-button').click()
    cy.get('.event-title').type('Test Event 4')
    cy.get('.save-button').click()

    cy.get('.add-event-button').click()
    cy.get('.event-title').type('Test Event 5')
    cy.get('.save-button').click()
  })
  it('events exist', function() {
    cy.get('.event > h3').should('exist')
  })
})

describe('Move events up and down', function() {
  it('goes to storyEditor', function() {
    cy.visit('http://localhost:3000/createstory')
  })
  it('adds an event', function() {
    cy.get('.add-event-button').click()
    cy.get('.event-title').type('Test Event 1')
    cy.get('.save-button').click()

    cy.get('.add-event-button').click()
    cy.get('.event-title').type('Test Event 2')
    cy.get('.save-button').click()

    cy.get('.add-event-button').click()
    cy.get('.event-title').type('Test Event 3')
    cy.get('.save-button').click()

    cy.get('.add-event-button').click()
    cy.get('.event-title').type('Test Event 4')
    cy.get('.save-button').click()

    cy.get('.add-event-button').click()
    cy.get('.event-title').type('Test Event 5')
    cy.get('.save-button').click()
  })
  it('moves up', function() {
    cy.get('.up-arrow-button-1').click()
  })
  it('moves down', function() {
    cy.get('.down-arrow-button-0').click()
  })
})

describe('Cancel creatig a new story', function() {
  it('cancels the story', function(){
    cy.get('.cancel-button').click()
  })
  it('redirects to home', function(){
    cy.url().should('contain', 'home')
  })
})