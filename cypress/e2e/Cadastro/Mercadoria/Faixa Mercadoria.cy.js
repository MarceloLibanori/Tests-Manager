///<reference types="cypress"/>

describe('Cadastro Faixa Mercadoria', () => {
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
        it('Cadastrar Faixa Mercadoria', () => {


            const task = testData.faixamercadoria

            cy.visit('http://127.0.0.1/manager/cad_faixa_mercadoria.php5')
            cy.incluir()
            cy.get('#COD_FAIXA_MERCADORIA').type(task.faixa)
            cy.get('#DESCRICAO').type(task.descricao)
            cy.msgincluir()
            cy.get('#FLT_COD_FAIXA_MERCADORIA').clear()
                .type(task.faixa)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_faixa_mercadoria_TBODY tr', task.faixa)
            cy.contains('#SEL_faixa_mercadoria_TBODY tr', '1 - São Paulo (CF-e SAT)')
                .should('be.visible')
        })
    })

    context('Alterar', () => {
        it('Alterar Faixa Mercadoria', () => {


            const task = testData.faixamercadoria

            cy.visit('http://127.0.0.1/manager/cad_faixa_mercadoria.php5')
            cy.get('#FLT_COD_FAIXA_MERCADORIA').clear()
                .type(task.faixa)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#faixa_mercadoria_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.descricaoalt)
            cy.msgalterar()
            cy.get('#FLT_COD_FAIXA_MERCADORIA').clear()
                .type(task.faixa)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#faixa_mercadoria_alterar').click()
            cy.get('#DESCRICAO').should('have.value', task.descricaoalt)

        })
    })

    context('Excluir', () => {
        it('Excluir Faixa Mercadoria', () => {


            const task = testData.faixamercadoria

            cy.visit('http://127.0.0.1/manager/cad_faixa_mercadoria.php5')
            cy.get('#FLT_COD_FAIXA_MERCADORIA').clear()
                .type(task.faixa)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#faixa_mercadoria_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})