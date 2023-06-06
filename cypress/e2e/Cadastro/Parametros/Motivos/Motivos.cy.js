///<reference types="cypress"/>

describe('Cadastro Motivos', () => {
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
        it('Cadastro Motivos', () => {

            const task = testData.Movivos


            cy.visit('/cad_motivo_devolucao.php5')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_MOTIVO').type(task.cod)
            cy.get('#DESCRICAO').type(task.name)
            cy.get('#FLG_TIPOS_DIV > :nth-child(1) > .control__indicator').click()
            cy.get(':nth-child(7) > :nth-child(1) > .form-group > .form-control > .control > .control__indicator').click()
            cy.msgincluir()
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.name)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_motivo_devolucao_TBODY tr', task.name)
                .contains('#SEL_motivo_devolucao_TBODY tr', task.cod)
                .should('be.visible')
        })
    })

    context('Alterar', () => {
        it('ALterar Motivos', () => {

            const task = testData.Movivos

            cy.visit('/cad_motivo_devolucao.php5')
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.name)
            cy.get('#FLT_COD_MOTIVO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#motivos_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.get('#FLG_TIPOS_DIV > :nth-child(1) > .control__indicator').click()
            cy.get('#FLG_TIPOS_DIV > :nth-child(5) > .control__indicator').click()
            cy.get(':nth-child(7) > :nth-child(1) > .form-group > .form-control > .control > .control__indicator').click()
            cy.msgalterar()
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.namealt)
            cy.get('#FLT_COD_MOTIVO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_motivo_devolucao_TBODY tr', task.namealt)
                .contains('#SEL_motivo_devolucao_TBODY tr', task.cod)
                .should('be.visible')
        })
    })
    context('Excluir', () => {
        it('Excluir Motivos', () => {

            const task = testData.Movivos

            cy.visit('/cad_motivo_devolucao.php5')
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.namealt)
            cy.get('#FLT_COD_MOTIVO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#motivos_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")

        })
    })
})