///<reference types="cypress"/>

describe('Cadastro Intermediador', () => {
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
        it('Cadastrar Intermediador', () => {

            const task = testData.intermediador

            cy.visit('http://127.0.0.1/manager/cad_intermediador.php5')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_INTERMEDIADOR').type(task.cod)
            cy.get('#DES_INTERMEDIADOR').type(task.name)
            cy.get('#NUM_CNPJ').type(task.cnpj)
            cy.msgincluir()
            cy.get('#FLT_COD_INTERMEDIADOR').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_intermediador_TBODY tr', task.name)
                .should('be.visible')

        })
    })

    context('Alterar', () => {
        it('Alterar Intermediador', () => {

            const task = testData.intermediador

            cy.visit('http://127.0.0.1/manager/cad_intermediador.php5')
            cy.get('#FLT_COD_INTERMEDIADOR').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#cad_intermediador_alterar').click()
            cy.get('#DES_INTERMEDIADOR').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_intermediador_TBODY tr', task.namealt)
                .should('be.visible')

        })
    })

    context('Excluir', () => {
        it('Excluir Intermediador', () => {

            const task = testData.intermediador

            cy.visit('http://127.0.0.1/manager/cad_intermediador.php5')
            cy.get('#FLT_COD_INTERMEDIADOR').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#cad_intermediador_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")

        })
    })
})