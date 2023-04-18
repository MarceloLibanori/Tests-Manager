///<reference types="cypress"/>

describe('Cadastro Teclas', () => {
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
        it('Cadastro Teclas', () => {

            const task = testData.Teclas

            cy.visit('http://127.0.0.1/manager/cad_tecla.php5')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_TECLA').type(task.cod)
            cy.get('#DESCRICAO').type(task.name)
            cy.get(':nth-child(4) > .control__indicator').click()
            cy.msgincluir()
            cy.get('#FLT_COD_TECLA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_tecla_TBODY tr', task.name)
                .contains('#SEL_tecla_TBODY tr', task.cod)
                .should('be.visible')
        })
    })

    context('Alterar', () => {
        it('Alterar Teclas', () => {

            const task = testData.Teclas

            cy.visit('http://127.0.0.1/manager/cad_tecla.php5')
            cy.get('#FLT_COD_TECLA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#tecla_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_tecla_TBODY tr', task.namealt)
                .contains('#SEL_tecla_TBODY tr', task.cod)
                .should('be.visible')
        })
    })

    context('Excluir', () => {
        it('Excluir Teclas', () => {

            const task = testData.Teclas

            cy.visit('http://127.0.0.1/manager/cad_tecla.php5')
            cy.get('#FLT_COD_TECLA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#tecla_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")

        })
    })
})
