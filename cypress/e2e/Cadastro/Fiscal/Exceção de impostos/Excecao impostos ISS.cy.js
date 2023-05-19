///<reference types="cypress"/>

describe('Cadastro Excecao impostos ISS', () => {
  beforeEach(() => {
    cy.login()
  })
  let testData;

  before(() => {
    cy.fixture('fiscal').then(t => {
      testData = t

    })
  })

  context('Cadastro', () => {
    it('Cadastrar Excecao impostos ISS', () => {

      const task = testData.iss


      cy.visit('http://127.0.0.1/manager/adm_excecao_impostos.php5?id_menu=20806')
      cy.get('#btn_regra_iss').click()
      cy.get('#btn_Incluir').click()
      cy.wait(500)
      cy.get('#MUNICIPIO_ORIGEM').type(task.uforigem)
      cy.get('#MUNICIPIO_DESTINO').type(task.ufdestino)
      cy.wait(200)
      cy.get('#DESCRICAO').type(task.name)
      cy.get('#CST').select('I - Isenta')
      cy.msgincluir()
      cy.wait(500)
      cy.get('#FLT_DESCRICAO').clear()
      .type(task.name)
      cy.get('#EXEC_FILTRO').click()

      cy.contains('#SEL_regras_icms_TBODY', task.name)
        .should('be.visible')
    })
  })
  context('Alterar', () => {
    it('Alterar Excecao impostos ISS', () => {

      const task = testData.iss

      
      cy.visit('http://127.0.0.1/manager/adm_excecao_impostos.php5?id_menu=20806')
      cy.get('#btn_regra_iss').click()
      cy.wait(500)
      cy.get('#FLT_DESCRICAO').clear()
      .type(task.name)
      cy.get('#EXEC_FILTRO').click()
      cy.get('#regras_icms_alterar').click()
      cy.get('#MUNICIPIO_ORIGEM').clear()
      .type(task.uforigem)
      cy.get('#DESCRICAO').clear()
        .type(task.namealt)
      cy.msgalterar()
      cy.get('#FLT_DESCRICAO').clear()
        .type(task.namealt)
      cy.get('#EXEC_FILTRO').click()

      cy.contains('#SEL_regras_icms_TBODY', task.namealt)
        .should('be.visible')

    })
  })
  context('Excluir', () => {
    it('Excluir Excecao impostos ISS', () => {

      const task = testData.iss

     
      cy.visit('http://127.0.0.1/manager/adm_excecao_impostos.php5?id_menu=20806')
      cy.get('#btn_regra_iss').click()
      cy.wait(500)
      cy.get('#FLT_DESCRICAO').clear()
      .type(task.namealt)
      cy.get('#EXEC_FILTRO').click()
      cy.get('#regras_icms_excluir').click()
      cy.msgexcluir()
      cy.get('#FLT_DESCRICAO').clear()
        .type(task.namealt)
      cy.get('#EXEC_FILTRO').click()
      cy.get('.dataTables_empty').should("exist")

    })

  })
})