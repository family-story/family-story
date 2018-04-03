describe('add events', function () {
    it('visits event editor', function () {
        cy.visit('http://localhost:3000/createstory')
    })

    it('clicks add event', function () {
        cy.get('.events-block > button')
            .click()
    })
})

describe('search Provo', function () {
    it('types Provo into map input', function () {
        cy.get('.MapBody > input')
            .type('Provo Ut')
        
        cy.get('.MapBody > .searchButtonMap')
            .click()
    })
})

describe('Adding Event Title', function () {
    it('add title', function () {
        cy.get('.eventTitleInput')
            .type('DevMountain starts')
    })
})

describe('Adding Event Date', function () {
    it('add January 6th 2016', function () {
        cy.get('.eventDateInput')
            .type('January 6th 2016')
    })
})

describe('Adding Event Description', function () {
    it('add Descrition', function () {
        cy.get('.editor-container > textarea')
            .type('I love DevMountain')
    })
})