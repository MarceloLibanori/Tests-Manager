///<reference types="cypress"/>

describe('Cadastro de tabela nutricional(', () => {
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
        it('Cadastro de tabela nutricional(', () => {


            const task = testData.infnutricional
            cy.visit('http://127.0.0.1/manager/cad_nutricional.php5')
            cy.incluir()
            cy.get('#COD_NUTRICIONAL').type(task.cod)
            cy.get('#DES_PORCAO').type(task.descricao)
            cy.get('#QTD_PORCAO').type(task.qtd)
            cy.get('#PORCAO_UNIDADE').type(task.un)
            cy.msgincluir()
            cy.get('#FLT_COD_NUTRICIONAL').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_nutricional_TBODY tr', task.cod)
            cy.contains('#SEL_nutricional_TBODY tr', task.descricao)
                .should('be.visible')
        })
    })

    context('Alterar', () => {
        it('Alterar de tabela nutricional(', () => {


            const task = testData.infnutricional

            cy.visit('http://127.0.0.1/manager/cad_nutricional.php5')
            cy.get('#FLT_COD_NUTRICIONAL').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#nutricional_alterar').click()
            cy.get('#DES_PORCAO').clear()
                .type(task.descricaoalt)
            cy.msgalterar()
            cy.get('#FLT_COD_NUTRICIONAL').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_nutricional_TBODY tr', task.cod)
            cy.contains('#SEL_nutricional_TBODY tr', task.descricaoalt)
                .should('be.visible')
        })
    })

    context('Excluir', () => {
        it('Excluir de tabela nutricional(', () => {


            const task = testData.infnutricional

            cy.visit('http://127.0.0.1/manager/cad_nutricional.php5')
            cy.get('#FLT_COD_NUTRICIONAL').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#nutricional_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})
