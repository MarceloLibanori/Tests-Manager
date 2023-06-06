///<reference types="cypress"/>

describe('Cadastro Interpretação de TEF', () => {
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
        it('Cadastrar Interpretação de TEF', () => {

            const task = testData.InterpretaçãodeTEF

            cy.visit('/cad_interpreta_tef.php5')
            cy.get('#COD_INSTITUICAO').type(task.cod)
            cy.get('#TEXTO_INTERPRETADO').type(task.name)
            cy.msgincluir()
            cy.get('#FLT_COD_INSTITUICAO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_interpreta_tef_TBODY tr', task.name)
                .contains('#SEL_interpreta_tef_TBODY tr', task.cod)
                .should('be.visible')
        })
    })
    context('Alterar', () => {
        it('Alterar Interpretação de TEF', () => {

            const task = testData.InterpretaçãodeTEF

            cy.visit('/cad_interpreta_tef.php5')
            cy.get('#FLT_COD_INSTITUICAO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#interpreta_tef_alterar').click()
            cy.get('#TEXTO_INTERPRETADO').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_interpreta_tef_TBODY tr', task.namealt)
                .contains('#SEL_interpreta_tef_TBODY tr', task.cod)
                .should('be.visible')
        })
    })
    context('Excluir', () => {
        it('Excluir Interpretação de TEF', () => {

            const task = testData.InterpretaçãodeTEF

            cy.visit('/cad_interpreta_tef.php5')
            cy.get('#FLT_COD_INSTITUICAO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#interpreta_tef_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})