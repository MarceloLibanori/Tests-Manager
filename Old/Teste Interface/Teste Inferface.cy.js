///<reference types="cypress"/>

describe('Consulta Cartão', () => {

    beforeEach(() => {
        
    })
    let testData;
  
    before(() => {
        cy.fixture('tasks').then(t => {
            testData = t

            
  
        })
    })
  
    context('Consulta Cartão', () => {
        it('Consulta Cartão', () => {
  
            const task = testData.funcaopdv

            cy.visit('http://127.0.0.1/Interface/')
            cy.get('#tool-1769-toolEl').click()
            cy.get('#teclafuncao-1230-btnIconEl').click()
            cy.get('#teclaentrar-1801-btnInnerEl').should('be.visible')
            cy.get('#campoinput-1798-inputEl').type('3360')
            cy.wait(800)
            cy.get('#campoinput-1798-inputEl').should('have.value','3360')
            cy.get('#teclaentrar-1801-btnInnerEl').click()
            cy.intercept('#teclaentrar-1814-btnInnerEl')
            cy.wait(15000)
            cy.get('#campoinput-1820-inputEl').type('888')
            cy.get('#campoinput-1820-inputEl').should('have.value','888')
     
    })
})

    context('Realizar venda', () => {
        it.only('Realizar venda', () => {
  
            const task = testData.funcaopdv

            cy.visit('http://127.0.0.1/Interface/')
            cy.get('#tool-1769-toolEl').click()
            cy.get('#campoinput-1260-inputEl').type('4001')
            cy.get('#campoinput-1260-inputEl').type('{enter}')
            cy.wait(5000)
            cy.get('#teclafinalizar-1231-btnIconEl').click()
            cy.get('#teclapagamento-1805-btnEl').click()
            cy.wait(5000)
            cy.get('#teclamensageira-1871-btnInnerEl').click()


        })
})
})
