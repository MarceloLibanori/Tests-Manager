///<reference types="cypress"/>

describe('Cadastro Cupom Promocional', () => {
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
        it('Cadastrar Cupom Promocional', () => {

            const task = testData.cupom

            cy.visit('/cad_cupom_promocional.php5')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_TEXTO').type(task.cod)
            cy.get('#QUANTIDADE_CUPONS').type(task.qtdcupom)
            cy.get('#MULTIPLICADOR_PONTOS').type(task.qtdpontos)
            cy.msgincluir()
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_cupom_promocional_TBODY tr', task.qtdcupom)
                .contains('#SEL_cupom_promocional_TBODY tr', task.qtdpontos)
                .should('be.visible')

        })
    })

    context('Alterar', () => {
        it('Alterar Cupom Promocional', () => {

            const task = testData.cupom

            cy.visit('/cad_cupom_promocional.php5')
            cy.get('#EXEC_FILTRO').click()
            cy.get('#valor_combo_alterar').click()
            cy.get('#QUANTIDADE_CUPONS').clear()
                .type(task.qtdcupomalt)            
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_cupom_promocional_TBODY tr', task.qtdcupomalt)
                .contains('#SEL_cupom_promocional_TBODY tr', task.qtdpontos)
                .should('be.visible')
        })
    })

    context('Excluir', () => {
        it('Excluir Cupom Promocional', () => {

            const task = testData.cupom

            cy.visit('/cad_cupom_promocional.php5')
            cy.get('#EXEC_FILTRO').click()
            cy.get('#valor_combo_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('#SEL_cupom_promocional_TBODY tr').should('have.length', 1)
            cy.get('.dataTables_empty').should("exist")
        })
    })
})