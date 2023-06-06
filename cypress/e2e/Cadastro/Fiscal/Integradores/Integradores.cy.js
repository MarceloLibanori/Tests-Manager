///<reference types="cypress"/>

describe('Cadastro Integradores', () => {
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
        it('Cadastro Integradores', () => {

            const task = testData.Integradores

            cy.visit('/cad_integrador.php5')
            cy.get('#btn_Incluir').click()
            cy.get('.input-group > #COD_INTEGRADOR').type(task.cod)
            cy.get('#DESCRICAO').type(task.name)
            cy.msgincluir()
            cy.get('#FLT_COD_INTEGRADOR').type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#SEL_integradores_TBODY tr').should('have.length', 1)

            cy.contains('#SEL_integradores_TBODY tr', task.name)
                .contains('#SEL_integradores_TBODY tr', task.cod)
                .should('be.visible')
        })
    })
    context('Alterar', () => {
        it('Alterar Integradores', () => {

            const task = testData.Integradores

            cy.visit('/cad_integrador.php5')
            cy.get('#FLT_COD_INTEGRADOR').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#integradores_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_integradores_TBODY tr', task.namealt)
                .contains('#SEL_integradores_TBODY tr', task.cod)
                .should('be.visible')
        })
    })

    context('Excluir', () => {
        it('Excluir Integradores', () => {

            const task = testData.Integradores

            cy.visit('/cad_integrador.php5')
            cy.get('#FLT_COD_INTEGRADOR').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#integradores_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})