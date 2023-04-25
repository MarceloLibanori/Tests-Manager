///<reference types="cypress"/>

describe('Cadastro Produto Sugerido', () => {
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
        it('Cadastro Produto Sugerido', () => {

            const task = testData.sugestaodevenda

            cy.visit('http://127.0.0.1/manager/cad_produto_sugerido.php5?')
            cy.incluir()
            cy.get('#COD_PRODUTO').type(task.prod)
            cy.get('#COD_PRODUTO_SUGERIDO').type(task.prod2)
            cy.get('#FLG_INTEGRACAO_ECOMMERCE').type(task.controle)
            cy.msgincluir()
            cy.get('#FLT_COD_PRODUTO').clear()
                .type(task.prod)
            cy.get('#FLT_COD_PRODUTO_SUGERIDO').clear()
                .type(task.prod2)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_produto_sugerido_TBODY tr', task.prod)
                .contains('#SEL_produto_sugerido_TBODY tr', task.prod2)
                .should('be.visible')

        })
    })

    context('Excluir', () => {
        it('Excluir Produto Sugerido', () => {

            const task = testData.sugestaodevenda

            cy.visit('http://127.0.0.1/manager/cad_produto_sugerido.php5?')
            cy.get('#FLT_COD_PRODUTO').clear()
                .type(task.prod)
            cy.get('#FLT_COD_PRODUTO_SUGERIDO').clear()
                .type(task.prod2)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#produto_sugerido_excluir').click()
            cy.msgexcluir()
            cy.get('#FLT_COD_PRODUTO').clear()
                .type(task.prod)
            cy.get('#FLT_COD_PRODUTO_SUGERIDO').clear()
                .type(task.prod2)
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})