///<reference types="cypress"/>

describe('Cadastro Algoritimos', () => {
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
        it('Cadastrar Algoritimos', () => {

            const task = testData.algoritimos

            cy.visit('http://127.0.0.1/manager/cad_algoritmo.php5?id_menu=20311')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_ALGORITMO').type(task.cod)
            cy.get('#DESCRICAO').type(task.name)
            cy.msgincluir()
            cy.get('#FLT_COD_ALGORITMO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_algoritmo_TBODY tr', task.name)
                .should('be.visible')
        })
    })
    context('Alterar', () => {
        it('Alterar Algoritimos', () => {

            const task = testData.algoritimos

            cy.visit('http://127.0.0.1/manager/cad_algoritmo.php5?id_menu=20311')
            cy.get('#FLT_COD_ALGORITMO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#algoritmo_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_algoritmo_TBODY tr', task.namealt)
                .contains('#SEL_algoritmo_TBODY tr', task.cod)
                .should('be.visible')
        })
    })

    context('Excluir', () => {
        it('Excluir Algoritimos', () => {

            const task = testData.algoritimos
            cy.visit('http://127.0.0.1/manager/cad_algoritmo.php5?id_menu=20311')
            cy.get('#FLT_COD_ALGORITMO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#algoritmo_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})