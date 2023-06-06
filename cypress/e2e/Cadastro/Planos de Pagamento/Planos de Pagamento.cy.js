///<reference types="cypress"/>

describe('Cadastro Planos de Pagamento', () => {
    beforeEach(() => {
        cy.login()
    })
    let testData;

    before(() => {
        cy.fixture('datas').then(t => {
            testData = t

        })
    })

    context('Cadastro', () => {
        it('Cadastrar Planos de Pagamento', () => {

            const task = testData.datas


            cy.visit('/cad_plano.php5')
            cy.get('#btn_Incluir').click()
            cy.get('#B_VALOR_BTN').click()
            cy.get('#NOME').type(task.name)
            cy.get('#COD_CLASSE_DIV > :nth-child(1) > .control__indicator').click()
            cy.get('#COD_CLASSE_DIV > :nth-child(5) > .control__indicator').click()
            cy.get('#COD_CLASSE_DIV > :nth-child(7) > .control__indicator').click()
            cy.get('#DIV_ABA_H_6').click()
            cy.get('#INICIO_VALIDADE').type(task.datainicio)
            cy.get('#FINAL_VALIDADE').type(task.datafim)
            cy.msgincluir()
            cy.get('#FLT_NOME').clear()
                .type(task.name)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_plano_TBODY tr ', task.name)
                .should('be.visible')

        })
    })

    context('Alterar', () => {
        it('Alterar Planos de Pagamento', () => {

            const task = testData.datas


            cy.visit('/cad_plano.php5')
            cy.get('#FLT_NOME').clear()
                .type(task.name)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#plano_alterar').click()
            cy.get('#NOME').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#FLT_NOME').clear()
                .type(task.namealt)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_plano_TBODY tr ', task.namealt)
                .should('be.visible')
        })
    })
    context('Excluir', () => {
        it('Excluir Planos de Pagamento', () => {

            const task = testData.datas


            cy.visit('/cad_plano.php5')
            cy.get('#FLT_NOME').clear()
                .type(task.namealt)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#plano_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")

        })
    })
})