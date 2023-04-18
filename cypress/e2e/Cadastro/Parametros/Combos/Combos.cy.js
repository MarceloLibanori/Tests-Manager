///<reference types="cypress"/>

describe('Cadastro Combos', () => {
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
        it('Cadastrar Combos', () => {

            const task = testData.combo

            cy.visit('http://127.0.0.1/manager/cad_combo.php5')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_COMBO').type(task.cod)
            cy.get('#DESCRICAO').type(task.name)
            cy.msgincluir()
            cy.get('#FLT_COD_COMBO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#COMBO_TBODY tr', task.name)
                .contains('#COMBO_TBODY tr', task.cod)
                .should('be.visible')

        })
    })
    context('Alterar', () => {
        it('Alterar Combos', () => {

            const task = testData.combo

            cy.visit('http://127.0.0.1/manager/cad_combo.php5')
            cy.get('#FLT_COD_COMBO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#combo_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#COMBO_TBODY tr', task.namealt)
                .contains('#COMBO_TBODY tr', task.cod)
                .should('be.visible')
        })
    })
    context('Excluir', () => {
        it('Excluir Combos', () => {

            const task = testData.combo

            cy.visit('http://127.0.0.1/manager/cad_combo.php5')
            cy.get('#FLT_COD_COMBO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#combo_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})