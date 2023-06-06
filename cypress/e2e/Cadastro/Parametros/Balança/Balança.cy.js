///<reference types="cypress"/>

describe('Cadastro Balança', () => {
    
    beforeEach(() => {
        cy.login()

    })
    
    
    let testData;

         
    before(() => {
        cy.fixture('balança').then(t => {
            testData = t

           
        })
        })

    context('Cadastro', () => {
        it('Cadastrar Balança', () => {

            const task = testData.balança

           
            cy.visit('/cad_balanca_loja.php5')
            cy.get('#btn_Incluir').click()
            cy.get('.select > #COD_CATEGORIA').select(task.categoria)
            cy.get('.select > #COD_BALANCA').select(task.codbalanca)
            cy.get('#CAMINHO_GERACAO').type(task.name)
            cy.get('#DIV_ABA_H_1').click()
            cy.get('#NOME_BALANCA').type(task.name)
            cy.get('#CLASSE_1_BOTAO').click()
            cy.msgincluir()
            cy.get('#FLT_COD_BALANCA').select(task.codbalanca)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_balanca_loja_TBODY', task.codbalanca)
                .contains('#SEL_balanca_loja_TBODY', task.categoria)
                .should('be.visible')
               

        })
    })

    context('Alterar', () => {
        it('Alterar Balança', () => {
            
            const task = testData.balança
           
          
            cy.visit('/cad_balanca_loja.php5')
            cy.get('#FLT_COD_BALANCA').select(task.codbalanca)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#balanca_loja_alterar').click()
            cy.get('#CAMINHO_GERACAO').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()
            cy.get('#balanca_loja_alterar').click()
            cy.get('#CAMINHO_GERACAO').should('have.value', task.namealt)
        })
    })

    context('Excluir', () => {
        it('Excluir Balança', () => {

            const task = testData.balança

           
            cy.visit('/cad_balanca_loja.php5')
            cy.get('#FLT_COD_BALANCA').select('22 - TOLEDO/MGV4')
            cy.get('#EXEC_FILTRO').click()
            cy.get('#balanca_loja_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")

        })
    })
})