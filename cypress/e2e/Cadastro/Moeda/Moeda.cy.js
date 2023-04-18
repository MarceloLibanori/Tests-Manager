///<reference types="cypress"/>

describe('Cadastro Moeda', () => {
    beforeEach(() => {
        cy.login()
    })
    let testData;

    before(() => {
        cy.fixture('Moeda').then(t => {
            testData = t

        })
    })

    context('Cadastro', () => {
        it('Cadastrar Moeda', () => {

            const task = testData.moeda


            cy.visit('http://127.0.0.1/manager/cad_moeda.php5')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_MOEDA').type(task.cod)
            cy.get('#DESCRICAO').type(task.name)
            cy.get('#FATOR_CONVERSAO').type(task.convert)
            cy.msgincluir()
            cy.get('#FLT_COD_MOEDA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#SEL_moeda_TBODY tr').should('have.length', 1)
            cy.get('.class_link_simples').should('exist')

            cy.contains('#SEL_moeda_TBODY tr', task.name)
                .contains('#SEL_moeda_TBODY tr', task.cod)
                .should('be.visible')

        })
    })

    context('Alterar', () => {
        it('Alterar Moeda', () => {

            const task = testData.moeda


            cy.visit('http://127.0.0.1/manager/cad_moeda.php5')
            cy.get('#FLT_COD_MOEDA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#moeda_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.get('#FATOR_CONVERSAO').clear()
                .type(task.convertalt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_moeda_TBODY tr', task.namealt)
                .contains('#SEL_moeda_TBODY tr', task.cod)
                .should('be.visible')

        })
    })

    context('Excluir', () => {
        it('Excluir Moeda', () => {

            const task = testData.moeda


            cy.visit('http://127.0.0.1/manager/cad_moeda.php5')
            cy.get('#FLT_COD_MOEDA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#moeda_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")

        })
    })
})