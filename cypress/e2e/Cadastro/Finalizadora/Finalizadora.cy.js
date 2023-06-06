///<reference types="cypress"/>

describe('Cadastro Finalizadora', () => {
    beforeEach(() => {
        cy.login()
    })
    let testData;

    before(() => {
        cy.fixture('finalizadora').then(t => {
            testData = t

        })
    })

    context('Cadastro', () => {
        it('Cadastrar Finalizadora', () => {

            const task = testData.finalizadora


            cy.visit('/cad_finalizadora.php5')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_FINALIZADORA').type(task.cod)
            cy.get('#DESCRICAO').type(task.name)
            cy.get('#DIV_ABA_H_3').click()
            cy.get('#COD_FINALIZA_ECF').type(task.codecf)
            cy.msgincluir()
            cy.get('#FLT_COD_FINALIZADORA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()


            cy.contains('#SEL_finalizadora_TBODY tr', task.name)
                .contains('#SEL_finalizadora_TBODY tr', task.cod)
                .should('be.visible')
        })
    })
    context('Alterar', () => {
        it('Alterar Finalizadora', () => {

            const task = testData.finalizadora


            cy.visit('/cad_finalizadora.php5')
            cy.get('#FLT_COD_FINALIZADORA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#finalizadora_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.get('#CLASSE_FINALIZADORA').select('0001 - Dinheiro')
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_finalizadora_TBODY tr', task.namealt)
                .contains('#SEL_finalizadora_TBODY tr', task.cod)
                .should('be.visible')
        })
    })
    context('Excluir', () => {
        it('Excluir Finalizadora', () => {

            const task = testData.finalizadora


            cy.visit('/cad_finalizadora.php5')
            cy.get('#FLT_COD_FINALIZADORA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#finalizadora_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")

        })
    })
})