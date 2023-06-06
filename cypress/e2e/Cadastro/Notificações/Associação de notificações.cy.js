///<reference types="cypress"/>

describe('Cadastro Associação de notificações', () => {

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
        it('Cadastrar Associação de notificações', () => {

            const task = testData.Associaçãodenotificações

            cy.visit('/cad_notificacao_associacao.php5')
            cy.incluir()
            cy.get('#COD_NOTIFICACAO_ASSOCIACAO').type(task.cod)
            cy.get('#DESCRICAO').type(task.descricao)
            cy.get('#CATEGORIA').select(task.categoria)
            cy.msgincluir()
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.descricao)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_notificacao_associacao_TBODY', task.descricao)
            cy.contains('#SEL_notificacao_associacao_TBODY', task.cod)
            cy.contains('#SEL_notificacao_associacao_TBODY', task.categoria)
                .should('be.visible')

        })
    })

    context('Alterar', () => {
        it('Alterar Associação de notificações', () => {

            const task = testData.Associaçãodenotificações

            cy.visit('/cad_notificacao_associacao.php5')
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.descricao)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#notificacao_associacao_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.descricaoalt)
            cy.msgalterar()
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.descricaoalt)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_notificacao_associacao_TBODY', task.descricaoalt)
            cy.contains('#SEL_notificacao_associacao_TBODY', task.cod)
            cy.contains('#SEL_notificacao_associacao_TBODY', task.categoria)
                .should('be.visible')
        })
    })
    context('Excluir', () => {
        it('Excluir Associação de notificações', () => {

            const task = testData.Associaçãodenotificações

            cy.visit('/cad_notificacao_associacao.php5')
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.descricaoalt)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#notificacao_associacao_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})
