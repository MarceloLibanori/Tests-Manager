///<reference types="cypress"/>

describe('Cadastro Grupos de notificações', () => {

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
        it('Cadastrar Grupos de notificações', () => {

            const task = testData.gruponotificacao

            cy.visit('http://127.0.0.1/manager/cad_grupo_notificacao.php5?id_menu=22301')
            cy.incluir()
            cy.get('#COD_GRUPO_NOTIFICACAO').type(task.cod)
            cy.get('#DESCRICAO').type(task.descricao)
            cy.msgincluir()
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.descricao)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_grupo_notificacao_TBODY td', task.descricao)
            cy.contains('#SEL_grupo_notificacao_TBODY', task.cod)
                .should('be.visible')

        })
    })
    context('Alterar', () => {
        it('Alterar Grupos de notificações', () => {

            const task = testData.gruponotificacao

            cy.visit('http://127.0.0.1/manager/cad_grupo_notificacao.php5?id_menu=22301')
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.descricao)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#grupo_notificacao_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.descricaoalt)
            cy.msgalterar()
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.descricaoalt)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_grupo_notificacao_TBODY td', task.descricaoalt)
            cy.contains('#SEL_grupo_notificacao_TBODY', task.cod)
                .should('be.visible')

        })
    })
    context('Excluir', () => {
        it('Excluir Grupos de notificações', () => {

            const task = testData.gruponotificacao

            cy.visit('http://127.0.0.1/manager/cad_grupo_notificacao.php5?id_menu=22301')
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.descricaoalt)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#grupo_notificacao_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")

        })
    })
})          