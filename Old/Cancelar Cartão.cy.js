///<reference types="cypress"/>

describe('Cancelar Cartão', () => {

  beforeEach(() => {
      cy.login()
  })
  let testData;

  before(() => {
      cy.fixture('tasks').then(t => {
          testData = t

      })
  })

  context('cancelar', () => {
      it('Cancelar Cartão', () => {

          const task = testData.servicos

          cy.visit('http://127.0.0.1/manager/cad_giftcard_cancelar.php5?id_menu=3010405')
          cy.wait(200)
          cy.get('#CARTAO').type('10')
          cy.wait(200)
          cy.get('#COMENTARIO').type('Marcelo Cypress')
          cy.wait(200)
          cy.get(':nth-child(12) > .control__indicator').click()
          cy.get('#GC_LOJA').should('have.text', '1 - São Paulo (CF-e SAT)')               

    })
  })
})