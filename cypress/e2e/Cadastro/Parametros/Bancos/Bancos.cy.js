///<reference types="cypress"/>

describe('Cadastro Bancos', () => {
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
        it('Cadastrar Bancos', () => {

            const task = testData.bancos

            cy.visit('http://127.0.0.1/manager/cad_banco.php5')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_BANCO').type(task.cod)
            cy.get('#DESCRICAO').type(task.name)
            cy.msgincluir()
            cy.get('#FLT_COD_BANCO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_BANCO_TBODY tr', task.name)
                .contains('#SEL_BANCO_TBODY tr', task.cod)
                .should('be.visible')
        })
    })
    context('Alterar', () => {
        it('Alterar Bancos', () => {

            const task = testData.bancos

            cy.visit('http://127.0.0.1/manager/cad_banco.php5')
            cy.get('#FLT_COD_BANCO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#banco_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_BANCO_TBODY tr', task.namealt)
                .contains('#SEL_BANCO_TBODY tr', task.cod)
                .should('be.visible')
        })
    })
    context('Excluir', () => {
        it('Excluir Bancos', () => {

            const task = testData.bancos

            cy.visit('http://127.0.0.1/manager/cad_banco.php5')
            cy.get('#FLT_COD_BANCO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#banco_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist") 
            
        })
    })
})
