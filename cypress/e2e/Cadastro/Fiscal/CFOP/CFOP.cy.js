///<reference types="cypress"/>

describe('Cadastro CFOP', () => {
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
        it('Cadastro CFOP', () => {

            const task = testData.CFOP


            cy.visit('http://127.0.0.1/manager/cad_cfop.php5')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_CODIGO_FISCAL').type(task.cod)
            cy.get('#CFOP').type(task.cfop)
            cy.get('#DES_COD_FISCAL').type(task.name)
            cy.get('#DES_REDUZIDA').type(task.name)
            cy.msgincluir()
            cy.get('#FLT_COD_CODIGO_FISCAL').clear()
                .type(task.cod)
            cy.get('#FLT_CFOP').type(task.cfop)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_cfop_TBODY tr', task.name)
                .contains('#SEL_cfop_TBODY tr', task.cod)
                .should('be.visible')
        })
    })

    context('Alterar', () => {
        it('Alterar CFOP', () => {

            const task = testData.CFOP

            cy.visit('http://127.0.0.1/manager/cad_cfop.php5')
            cy.get('#FLT_COD_CODIGO_FISCAL').clear()
                .type(task.cod)
            cy.get('#FLT_CFOP').clear()
                .type(task.cfop)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#codigo_fiscal_alterar').click()
            cy.get('#DES_COD_FISCAL').clear()
                .type(task.namealt)
            cy.get('#DES_REDUZIDA').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_cfop_TBODY tr', task.namealt)
                .contains('#SEL_cfop_TBODY tr', task.cod)
                .should('be.visible')
        })
    })
    context('Excluir', () => {
        it('Excluir CFOP', () => {

            const task = testData.CFOP

            cy.visit('http://127.0.0.1/manager/cad_cfop.php5')
            cy.get('#FLT_COD_CODIGO_FISCAL').clear()
                .type(task.cod)
            cy.get('#FLT_CFOP').clear()
                .type(task.cfop)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#codigo_fiscal_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})
