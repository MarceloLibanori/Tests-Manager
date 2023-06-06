///<reference types="cypress"/>

describe('Cadastro Familia', () => {
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
        it('Cadastro Familia', () => {

            const task = testData.familia

            cy.visit('/cad_familia_produto.php5')
            cy.incluir()
            cy.get('#COD_FAMILIA').type(task.cod)
            cy.get('#ABR_FAMILIA').type(task.descricao)
            cy.get('#DES_FAMILIA').type(task.descricao)
            cy.msgincluir()
            cy.get('#FLT_COD_FAMILIA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_familia_produto_TBODY tr', task.cod)
            cy.contains('#SEL_familia_produto_TBODY tr', task.descricao)
                .should('be.visible')

        })
    })
    context('Alterar', () => {
        it('Alterar Familia', () => {

            const task = testData.familia

            cy.visit('/cad_familia_produto.php5')
            cy.get('#FLT_COD_FAMILIA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#familia_produto_alterar').click()
            cy.get('#ABR_FAMILIA').clear()
                .type(task.descricaoalt)
            cy.msgalterar()
            cy.get('#FLT_COD_FAMILIA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_familia_produto_TBODY tr', task.cod)
            cy.contains('#SEL_familia_produto_TBODY tr', task.descricaoalt)
                .should('be.visible')

        })
    })

    context('Excluir', () => {
        it('Excluir Familia', () => {

            const task = testData.familia

            cy.visit('/cad_familia_produto.php5')
            cy.get('#FLT_COD_FAMILIA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#familia_produto_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")

        })
    })
})



