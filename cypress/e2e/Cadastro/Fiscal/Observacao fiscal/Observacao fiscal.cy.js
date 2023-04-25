///<reference types="cypress"/>

describe('Cadastro Observacao fiscal', () => {
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
        it('Cadastro Observacao fiscal', () => {

            const task = testData.Observacaofiscal

            cy.visit('http://127.0.0.1/manager/cad_observacao_fiscal.php5')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_OBSERVACAO_FISCAL').type(task.cod)
            cy.get('#DES_OBSERVACAO_FISCAL').type(task.name)
            cy.get('#OBS_OBSERVACAO_FISCAL').type(task.name)
            cy.get('#TIPO_OBSERVACAO_FISCAL').select(task.tipoobs)
            cy.msgincluir()
            cy.get('#FLT_COD_OBSERVACAO_FISCAL').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_observacao_fiscal_TBODY tr', task.name)
                .contains('#SEL_observacao_fiscal_TBODY tr', task.cod)
                .contains('#SEL_observacao_fiscal_TBODY tr', task.tipoobs)
                .should('be.visible')

        })
    })

    context('Alterar', () => {
        it('Alterar Observacao fiscal', () => {

            const task = testData.Observacaofiscal

            cy.visit('http://127.0.0.1/manager/cad_observacao_fiscal.php5')
            cy.get('#FLT_COD_OBSERVACAO_FISCAL').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#observacao_fiscal_alterar').click()
            cy.get('#DES_OBSERVACAO_FISCAL').clear()
                .type(task.namealt)
            cy.get('#OBS_OBSERVACAO_FISCAL').clear()
                .type(task.namealt)
            cy.get('#TIPO_OBSERVACAO_FISCAL').select(task.tipoobsalt)
            cy.msgalterar()
            cy.get('#FLT_COD_OBSERVACAO_FISCAL').clear()
            .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_observacao_fiscal_TBODY tr', task.namealt)
                .contains('#SEL_observacao_fiscal_TBODY tr', task.cod)
                .contains('#SEL_observacao_fiscal_TBODY tr', task.tipoobsalt)
                .should('be.visible')

        })
    })
    context('Excluir', () => {
        it('Excluir Observacao fiscal', () => {

            const task = testData.Observacaofiscal

            cy.visit('http://127.0.0.1/manager/cad_observacao_fiscal.php5')
            cy.get('#FLT_COD_OBSERVACAO_FISCAL').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#observacao_fiscal_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")

        })
    })
})