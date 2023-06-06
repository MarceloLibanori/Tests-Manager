///<reference types="cypress"/>

describe('Cadastro Cedulas', () => {
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
        it('Cadastrar Cedulas', () => {

            const task = testData.cedulas

            cy.visit('/cad_cedula.php5')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_TAB_CEDULA').type(task.cod)
            cy.get('#VALOR').type(task.valor)
            cy.get('#DESCRICAO').type(task.name)
            cy.msgincluir()
            cy.get('#FLT_COD_TAB_CEDULA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#SEL_cedula_TBODY tr').should('have.length', 1)
            cy.get('.class_link_simples').should('exist')

            cy.contains('#SEL_cedula_TBODY tr', task.name)
                .contains('#SEL_cedula_TBODY tr', task.cod)
                .contains('#SEL_cedula_TBODY tr', task.valor)
                .should('be.visible')
        })
    })
    context('Alterar', () => {
        it('Alterar Cedulas', () => {

            const task = testData.cedulas

            cy.visit('/cad_cedula.php5')
            cy.get('#FLT_COD_TAB_CEDULA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#cedula_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#FLT_COD_TAB_CEDULA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_cedula_TBODY tr', task.namealt)
                .contains('#SEL_cedula_TBODY tr', task.cod)
                .contains('#SEL_cedula_TBODY tr', task.valor)
                .should('be.visible')
        })
    })
    context('Excluir', () => {
        it('Excluir Cedulas', () => {

            const task = testData.cedulas

            cy.visit('/cad_cedula.php5')
            cy.get('#FLT_COD_TAB_CEDULA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#cedula_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist") 
        })
    })
})