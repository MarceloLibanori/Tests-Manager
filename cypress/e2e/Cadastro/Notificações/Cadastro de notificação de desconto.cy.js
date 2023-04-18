///<reference types="cypress"/>

describe('Cadastro Cadastro de notificação de desconto', () => {

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
        it('Cadastrar Cadastro de notificação de desconto', () => {

            const task = testData.notificaçãodedesconto

            cy.visit('http://127.0.0.1/manager/cad_notificacao_desconto.php5')
            cy.incluir()
            cy.get('#FAIXA_INICIAL').type(task.valor)
            cy.msgincluir()
            cy.get('#FLT_COD_GRUPO_NOTIFICACAO').clear()
            .type('10')
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_notificacao_desconto_TBODY', task.grupo)
            cy.contains('#SEL_notificacao_desconto_TBODY', task.grupo1)
             .should('be.visible')
             
        })
    })

    context('Alterar', () => {
        it('Alterar Cadastro de notificação de desconto', () => {

            const task = testData.notificaçãodedesconto

            cy.visit('http://127.0.0.1/manager/cad_notificacao_desconto.php5')
            cy.get('#FLT_COD_GRUPO_NOTIFICACAO').clear()
            .type('10')
            cy.get('#EXEC_FILTRO').click()
            cy.get('#cad_layout_email_alterar').click()
            cy.get('#COD_GRUPO_NOTIFICACAO').select(task.grupoalt)
            cy.msgalterar()
            cy.get('#FLT_COD_GRUPO_NOTIFICACAO').clear()
            .type('11')
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_notificacao_desconto_TBODY', task.grupoalt)
            cy.contains('#SEL_notificacao_desconto_TBODY', task.grupo1)
             .should('be.visible')


})
    })
    context('Excluir', () => {
        it('Excluir Cadastro de notificação de desconto', () => {

            const task = testData.notificaçãodedesconto

            cy.visit('http://127.0.0.1/manager/cad_notificacao_desconto.php5')
            cy.get('#FLT_COD_GRUPO_NOTIFICACAO').clear()
            .type('11')
            cy.get('#EXEC_FILTRO').click()
            cy.get('#cad_layout_email_excluir').click()
            cy.msgexcluir()
            cy.get('#FLT_COD_GRUPO_NOTIFICACAO').clear()
            .type('11')
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")

})
    })
})


