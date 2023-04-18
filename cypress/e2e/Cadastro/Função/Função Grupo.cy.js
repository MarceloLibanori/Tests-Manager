///<reference types="cypress"/>

describe('Cadastro Função Grupo', () => {
    beforeEach(() => {
        cy.login()
    })
    let testData;

    before(() => {
        cy.fixture('funcao').then(t => {
            testData = t

        })
    })

    context('Cadastro', () => {
        it('Cadastrar Função Grupo', () => {

            const task = testData.funcaogrupo


            cy.visit('http://127.0.0.1/manager/cad_grupo_funcao.php5?id_menu=20902')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_GRUPO_FUNCAO').type(task.cod)
            cy.get('#DESCRICAO').type(task.name)
            cy.msgincluir()
            cy.get('#FLT_COD_GRUPO_FUNCAO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_grupo_funcao_TBODY tr', task.name)
                .contains('#SEL_grupo_funcao_TBODY tr', task.cod)
                .should('be.visible')


        })
    })

    context('Alterar', () => {
        it('Alterar Função Grupo', () => {

            const task = testData.funcaogrupo


            cy.visit('http://127.0.0.1/manager/cad_grupo_funcao.php5?id_menu=20902')
            cy.get('#FLT_COD_GRUPO_FUNCAO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#grupo_funcao_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_grupo_funcao_TBODY tr', task.namealt)
                .contains('#SEL_grupo_funcao_TBODY tr', task.cod)
                .should('be.visible')

        })
    })

    context('Excluir', () => {
        it('Excluir Função Grupo', () => {

            const task = testData.funcaogrupo


            cy.visit('http://127.0.0.1/manager/cad_grupo_funcao.php5?id_menu=20902')
            cy.get('#FLT_COD_GRUPO_FUNCAO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#grupo_funcao_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})