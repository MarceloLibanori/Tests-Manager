///<reference types="cypress"/>

describe('Cadastro Exceção PIS', () => {
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
        it('Cadastro Exceção PIS', () => {

            const task = testData.PIS

            cy.visit('/adm_excecao_impostos.php5')
            cy.get('#btn_excecao_pis').click()
            cy.get('#btn_Incluir').click()
            cy.get('#DESCRICAO').type(task.name)
            cy.get('#UF_ORIGEM').select(task.origem)
            cy.get('#UF_DESTINO').select(task.origem)
            cy.get('#CST').select(task.cst)
            cy.get('#COD_NCM_INI').type(task.ncm)
            cy.get('#COD_NCM_FINAL').type(task.ncm)
            cy.msgincluir()
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.name)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_regras_icms_TBODY tr', task.name)
                .should('be.visible')
        })
    })
    context('Alterar', () => {
        it('Alterar Exceção PIS', () => {

            const task = testData.PIS

            cy.visit('/adm_excecao_impostos.php5')
            cy.get('#btn_excecao_pis').click()
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.name)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#regras_icms_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.namealt)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_regras_icms_TBODY tr', task.namealt)
                .should('be.visible')
        })
    })
    context('Alterar', () => {
        it('Alterar Exceção PIS', () => {

            const task = testData.PIS

            cy.visit('/adm_excecao_impostos.php5')
            cy.get('#btn_excecao_pis').click()
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.namealt)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#regras_icms_excluir').click()
            cy.msgexcluir()
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.namealt)
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})