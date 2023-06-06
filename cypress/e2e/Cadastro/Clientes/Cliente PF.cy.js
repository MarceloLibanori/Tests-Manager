///<reference types="cypress"/>

describe('Cadastro Clientes PF', () => {


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
    it('Cadastrar cliente PF', () => {

      const task = testData.pf


      cy.visit('/cad_cliente.php5')
      cy.incluir()
      cy.get('#B_VALOR_BTN').click()
      cy.get('#DES_CLIENTE').type(task.name)
      cy.get('#NUM_CGC').type(task.cpf)
      cy.get('#NUM_INSC_EST').type(task.rg)
      cy.endereco()
      cy.msgincluir()
      cy.get('#lgpd-enviar').click()
      cy.buscar(task.cpf)
      cy.contains('#SEL_cliente_TBODY', task.name)
        .should('be.visible')


    })

  })
  context('Alterar', () => {
    it('Alterar cliente PF', () => {

      const task = testData.pf

      cy.visit('/cad_cliente.php5')
      cy.buscar(task.cpf)
      cy.get('#parametro_geral_alterar').click()
      cy.get('#DIV_ABA_H_0').click()
      cy.get('#DES_CLIENTE').clear()
        .type(task.namealt)
      cy.msgalterar()
      cy.get('#lgpd-enviar').click()
      cy.buscar(task.cpf)
      cy.contains('#SEL_cliente_TBODY', task.namealt)
        .should('be.visible')


    })

  })
  context('Excluir', () => {
    it('Excluir cliente PF', () => {
      const task = testData.pf

      cy.visit('/cad_cliente.php5')
      cy.buscar(task.cpf)
      cy.contains('#SEL_cliente_TBODY', task.namealt)
        .should('be.visible')
      cy.get('#parametro_geral_excluir').click()
      cy.msgexcluir()
      cy.get('#EXEC_FILTRO').click()
      cy.get('.dataTables_empty').should("exist")







    })

  })


})