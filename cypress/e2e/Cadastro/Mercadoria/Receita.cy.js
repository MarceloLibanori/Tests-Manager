///<reference types="cypress"/>

describe('Cadastro Receita(', () => {
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
        it('Cadastro Receita(', () => {


            const task = testData.receita

            cy.visit('http://127.0.0.1/manager/cad_receita.php5?id_menu=21105')
            cy.incluir()
            cy.get('#COD_RECEITA').type(task.cod)
            cy.get('#DES_RECEITA').type(task.descricao)
            cy.get('#DES_DETALHAMENTO').type(task.detalhereceita)
            cy.msgincluir()
            cy.get('#FLT_DES_RECEITA').clear()
                .type(task.descricao)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_receita_TBODY tr', task.cod)
            cy.contains('#SEL_receita_TBODY tr', task.descricao)
                .should('be.visible')

        })
    })

    context('Alterar', () => {
        it('Alterar Receita(', () => {


            const task = testData.receita

            cy.visit('http://127.0.0.1/manager/cad_receita.php5?id_menu=21105')
            cy.get('#FLT_DES_RECEITA').clear()
                .type(task.descricao)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#receita_alterar').click()
            cy.get('#DES_RECEITA').clear()
                .type(task.descricaoalt)
            cy.msgalterar()
            cy.get('#FLT_DES_RECEITA').clear()
                .type(task.descricaoalt)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_receita_TBODY tr', task.cod)
            cy.contains('#SEL_receita_TBODY tr', task.descricaoalt)
                .should('be.visible')
        })
    })
    context('Excluir', () => {
        it('Excluir Receita(', () => {


            const task = testData.receita

            cy.visit('http://127.0.0.1/manager/cad_receita.php5?id_menu=21105')
            cy.get('#FLT_DES_RECEITA').clear()
                .type(task.descricaoalt)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#receita_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})