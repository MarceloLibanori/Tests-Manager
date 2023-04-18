///<reference types="cypress"/>

describe('Cadastro Exceção IPI', () => {
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
        it('Cadastro Exceção IPI', () => {

            const task = testData.IPI

            cy.visit('http://127.0.0.1/manager/adm_excecao_impostos.php5?id_menu=20806')
            cy.get('#btn_regra_ipi').click()
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
        it('Alterar Exceção IPI', () => {

            const task = testData.IPI

            cy.visit('http://127.0.0.1/manager/adm_excecao_impostos.php5?id_menu=20806')
            cy.get('#btn_regra_ipi').click()
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
    context('Excluir', () => {
        it('Excluir Exceção IPI', () => {

            const task = testData.IPI

            cy.visit('http://127.0.0.1/manager/adm_excecao_impostos.php5?id_menu=20806')
            cy.get('#btn_regra_ipi').click()
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.namealt)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#regras_icms_excluir').click()
            cy.msgexcluir()
            cy.get('#FLT_DESCRICAO').type(task.namealt)
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})