///<reference types="cypress"/>

describe('Cadastro Chaves criptografia PDV', () => {
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
        it('Cadastrar Chaves criptografia PDV', () => {

            const task = testData.chave

            cy.visit('/cad_chaves_pdv.php5')
            cy.get('#btn_Incluir').click()
            cy.get('#DESCRICAO').type(task.name)
            cy.get('#CONTEUDO').type(task.chave)
            cy.msgincluir()
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_chaves_pdv_TBODY tr', task.name)
                .should('be.visible')

        })
    })
    context('Alterar', () => {
        it('Alterar Chaves criptografia PDV', () => {

            const task = testData.chave

            cy.visit('/cad_chaves_pdv.php5')
            cy.get('#EXEC_FILTRO').click()
            cy.get('#cad_chaves_pdv_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_chaves_pdv_TBODY tr', task.namealt)
                .should('be.visible')
        })
    })
    context('Excluir', () => {
        it('Excluir Chaves criptografia PDV', () => {

            const task = testData.chave

            cy.visit('/cad_chaves_pdv.php5')
            cy.get('#EXEC_FILTRO').click()
            cy.get('#cad_chaves_pdv_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})