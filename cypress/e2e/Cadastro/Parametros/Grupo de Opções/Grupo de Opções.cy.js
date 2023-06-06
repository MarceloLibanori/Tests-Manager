///<reference types="cypress"/>

describe('Cadastro Grupo de Opções', () => {
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
        it('Cadastrar Grupo de Opções', () => {

            const task = testData.grpopcoes

            cy.visit('/cad_grupo_opcao.php5')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_GRUPO_OPCAO').type(task.cod)
            cy.get('#DESCRICAO').type(task.name)
            cy.get('#COD_FINALIZADORA').type(task.finaliza)
            cy.msgincluir()
            cy.get('#FLT_COD_GRUPO_OPCAO').clear()
                .type(task.cod)
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.name)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_grupo_opcao_TBODY tr', task.cod)
                .contains('#SEL_grupo_opcao_TBODY tr', 'DINHEIRO')
                .contains('#SEL_grupo_opcao_TBODY tr', task.name)
                .should('be.visible')
        })
    })
    context('Alterar', () => {
        it('Alterar Grupo de Opções', () => {

            const task = testData.grpopcoes

            cy.visit('/cad_grupo_opcao.php5')
            cy.get('#FLT_COD_GRUPO_OPCAO').clear()
                .type(task.cod)
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.name)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#grupo_opcao_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#FLT_COD_GRUPO_OPCAO').clear()
                .type(task.cod)
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.namealt)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_grupo_opcao_TBODY tr', task.cod)
                .contains('#SEL_grupo_opcao_TBODY tr', 'DINHEIRO')
                .contains('#SEL_grupo_opcao_TBODY tr', task.namealt)
                .should('be.visible')
        })
    })

    context('Excluir', () => {
        it('Excluir Grupo de Opções', () => {

            const task = testData.grpopcoes

            cy.visit('/cad_grupo_opcao.php5')
            cy.get('#FLT_COD_GRUPO_OPCAO').clear()
                .type(task.cod)
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.namealt)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#grupo_opcao_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})