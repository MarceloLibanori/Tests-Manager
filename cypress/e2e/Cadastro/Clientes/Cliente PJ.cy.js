///<reference types="cypress"/>

describe('Cadastro cliente PJ', () => {

  beforeEach(() => {
    cy.login()
  })

  let testData;

  before(() => {
    cy.fixture('tasks').then(t => {
      testData = t

    })
  })
  context('Cadastro', () => {

    it('Cadastrar cliente PJ', () => {

      const task = testData.pj


      cy.visit('http://127.0.0.1/manager/cad_cliente.php5?id_menu=202')
      cy.incluir()
      cy.get('#FLG_EMPRESA').select('Pessoa jurídica')
      cy.get('#B_VALOR_BTN').click()
      cy.get('#DES_CLIENTE').type(task.name)
      cy.get('#NUM_CGC').type(task.cnpj)
      cy.endereco()
      cy.msgincluir()
      cy.buscar(task.cnpj)

      cy.contains('#SEL_cliente_TBODY', task.name)
        .should('be.visible')
    })
  })
  context('Alterar', () => {

    it('Alterar cliente PJ', () => {
      const task = testData.pj


      cy.visit('http://127.0.0.1/manager/cad_cliente.php5?id_menu=202')
      cy.buscar(task.cnpj)
      cy.get('#parametro_geral_alterar').click()
      cy.get('#DIV_ABA_H_0').click()
      cy.get('#DES_CLIENTE').clear()
        .type(task.namealt)
      cy.msgalterar()
      cy.buscar(task.cnpj)

      cy.contains('#SEL_cliente_TBODY', task.namealt)
        .should('be.visible')
    })
  })
  context('Excluir', () => {

    it('Excluir cliente PJ', () => {
      const task = testData.pj

      cy.visit('http://127.0.0.1/manager/cad_cliente.php5?id_menu=202')
      cy.buscar(task.cnpj)
      cy.get('#parametro_geral_excluir').click()
      cy.msgexcluir()
      cy.buscar(task.cnpj)
      cy.get('.dataTables_empty').should("exist")

    })
  })
})
