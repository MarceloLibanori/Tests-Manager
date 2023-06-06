///<reference types="cypress"/>

describe('Cadastro Texto', () => {
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
        it('Cadastro Texto', () => {

            const task = testData.Texto

            cy.visit('/cad_texto.php5')
            cy.get('#btn_Incluir').click()
            cy.get('.form-group > #COD_TEXTO').type(task.cod)
            cy.get('#DESCRICAO').type(task.name)
            cy.get('#DIV_ABA_H_1').click()
            cy.get('#COD_LINHA').type(task.codlinha)
            cy.get('#CLASSE_1_BOTAO').click()
            cy.msgincluir()
            cy.get('#FLT_COD_TEXTO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_texto_TBODY tr', task.name)
                .contains('#SEL_texto_TBODY tr', task.cod)
                .should('be.visible')

        })
    })
    context('Alterar', () => {
        it('Alterar Texto', () => {

            const task = testData.Texto

            cy.visit('/cad_texto.php5')
            cy.get('#FLT_COD_TEXTO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#texto_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_texto_TBODY tr', task.namealt)
                .contains('#SEL_texto_TBODY tr', task.cod)
                .should('be.visible')
        })
    })
    context('Excluir', () => {
        it('Excluir Texto', () => {

            const task = testData.Texto

            cy.visit('/cad_texto.php5')
            cy.get('#FLT_COD_TEXTO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#texto_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('#SEL_texto_TBODY tr').should('have.length', 1)
            cy.get('.dataTables_empty').should("exist")
        })
    })
})

