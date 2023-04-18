///<reference types="cypress"/>

describe('Cadastro Coeficiente', () => {
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
        it('Cadastrar Coeficiente', () => {
            const task = testData.valores


            cy.visit('http://127.0.0.1/manager/cad_coeficiente.php5')
            cy.incluir()
            cy.get('#COD_COEFICIENTE').type(task.cod)
            cy.get('#COEFICIENTE1').type(task.valor1)
            cy.msgincluir()
            cy.filtra()
            cy.get('#FLT_COD_COEFICIENTE').clear()
            .type(task.cod)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_coeficiente_TBODY', '555')
                .contains('#SEL_coeficiente_TBODY', '556,0000')
                .should('be.visible')
        })
    })
    context('Alterar', () => {
        it('Alterar Coeficiente', () => {
            const task = testData.valores



            cy.visit('http://127.0.0.1/manager/cad_coeficiente.php5')
            cy.filtra()
            cy.get('#FLT_COD_COEFICIENTE').clear()
            .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#coeficiente_alterar').click()
            cy.get('#COEFICIENTE1').clear()
                .type(task.valoralt)
            cy.get('#COEFICIENTE2').type(task.valor3)
            cy.msgalterar()
            cy.get('#FLT_COD_COEFICIENTE').clear()
            .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_coeficiente_TBODY', task.cod)
                .contains('#SEL_coeficiente_TBODY', '333,0000')
                .contains('#SEL_coeficiente_TBODY', '150,0000')
                .should('be.visible')

        })
    })
    context('Excluir', () => {
        it('Excluir Coeficiente', () => {
            const task = testData.valores


            cy.visit('http://127.0.0.1/manager/cad_coeficiente.php5')
            cy.filtra()
            cy.get('#FLT_COD_COEFICIENTE').clear()
            .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#coeficiente_excluir').click()
            cy.msgexcluir()
            cy.filtra()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")



        })
    })
})

