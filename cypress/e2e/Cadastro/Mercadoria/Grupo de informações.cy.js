///<reference types="cypress"/>

describe('Cadastro Grupo de informações', () => {
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
        it('Cadastro Grupo de informações', () => {

            const task = testData.Grupodeinformações

            cy.visit('http://127.0.0.1/manager/cad_grupo_informacao.php5?')
            cy.incluir()
            cy.get('#COD_GRUPO_INFORMACAO').type(task.cod)
            cy.get('#DES_GRUPO').type(task.descricao)
            cy.get('#DIV_ABA_H_1').click()
            cy.get('#DES_GRUPO_ITEM').type(task.descricao)
            cy.get('#COD_GRUPO_INFORMACAO_ITEM').type(task.cod)
            cy.get('#CLASSE_1_BOTAO').click()
            cy.msgincluir()
            cy.get('#FLT_DES_GRUPO').clear()
                .type(task.descricao)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_grupo_informacao_TBODY tr', task.descricao)
                .should('be.visible')

        })
    })

    context('Alterar', () => {
        it('Alterar Grupo de informações', () => {

            const task = testData.Grupodeinformações

            cy.visit('http://127.0.0.1/manager/cad_grupo_informacao.php5?')
            cy.get('#FLT_DES_GRUPO').clear()
                .type(task.descricao)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#grupo_informacao_alterar').click()
            cy.get('#DES_GRUPO').clear()
                .type(task.descricaoalt)
            cy.msgalterar()
            cy.get('#FLT_DES_GRUPO').clear()
                .type(task.descricaoalt)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_grupo_informacao_TBODY tr', task.descricaoalt)
                .should('be.visible')
        })
    })

    context('Excluir', () => {
        it('Excluir Grupo de informações', () => {

            const task = testData.Grupodeinformações

            cy.visit('http://127.0.0.1/manager/cad_grupo_informacao.php5?')
            cy.get('#FLT_DES_GRUPO').clear()
                .type(task.descricaoalt)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#grupo_informacao_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")

        })
    })
})




