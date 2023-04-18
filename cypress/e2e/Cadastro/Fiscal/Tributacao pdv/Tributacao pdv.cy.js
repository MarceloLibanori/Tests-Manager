///<reference types="cypress"/>

describe('Cadastro Tributacao pdv', () => {
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
        it('Cadastro Tributacao pdv', () => {

            const task = testData.Tributacaopdv

            cy.visit('http://127.0.0.1/manager/cad_tributacao_pdv.php5')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_TRIBUTACAO_PDV').type(task.cod)
            cy.get('#DESCRICAO').type(task.name)
            cy.get('#ALIQUOTA').type(task.aliquota)
            cy.msgincluir()
            cy.get('#FLT_COD_TRIBUTACAO_PDV').clear()
                .type(task.cod)
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.name)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_tributacao_pdv_TBODY tr', task.name)
                .contains('#SEL_tributacao_pdv_TBODY tr', task.cod)
                .should('be.visible')
        })
    })
    context('Alterar', () => {
        it('Alterar Tributacao pdv', () => {

            const task = testData.Tributacaopdv

            cy.visit('http://127.0.0.1/manager/cad_tributacao_pdv.php5')
            cy.get('#FLT_COD_TRIBUTACAO_PDV').clear()
                .type(task.cod)
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.name)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#tributacao_pdv_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.get('#ALIQUOTA').clear()
                .type(task.aliquotaalt)
            cy.msgalterar()
            cy.get('#FLT_DESCRICAO').clear()
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_tributacao_pdv_TBODY tr', task.namealt)
                .contains('#SEL_tributacao_pdv_TBODY tr', task.cod)
                .should('be.visible')
        })
    })

    context('Excluir', () => {
        it('Excluir Tributacao pdv', () => {

            const task = testData.Tributacaopdv

            cy.visit('http://127.0.0.1/manager/cad_tributacao_pdv.php5')
            cy.get('#FLT_COD_TRIBUTACAO_PDV').clear()
                .type(task.cod)
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.namealt)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#tributacao_pdv_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})