///<reference types="cypress"/>

describe('Cadastro Departamento loja', () => {

    beforeEach(() => {
        cy.login()
    })
    let testData;

    before(() => {
        cy.fixture('departamento').then(t => {
            testData = t

        })
    })

    context('Cadastro', () => {
        it('Cadastrar Departamento Geral', () => {

            const task = testData.departamentoloja



            cy.visit('http://127.0.0.1/manager/cad_departamento_geral.php5?id_menu=21203')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_DEPARTAMENTO').type(task.cod)
            cy.get('#DESCRICAO').type(task.name)
            cy.msgincluir()
            cy.get('#FLT_COD_DEPARTAMENTO').clear()
            .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_departamento_geral_TBODY tr', task.name)
                .contains('#SEL_departamento_geral_TBODY tr', task.cod)
                .should('be.visible')

        })
    })

    context('Alterar', () => {
        it('Alterar Departamento Geral', () => {

            const task = testData.departamentoloja



            cy.visit('http://127.0.0.1/manager/cad_departamento_geral.php5?id_menu=21203')
            cy.get('#FLT_COD_DEPARTAMENTO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#cad_departamento_alterar > .fa').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_departamento_geral_TBODY', task.namealt)
                .contains('#SEL_departamento_geral_TBODY', task.cod)
                .should('be.visible')
        })
    })

    context('Excluir', () => {
        it('Excluir Departamento Geral', () => {

            const task = testData.departamentoloja



            cy.visit('http://127.0.0.1/manager/cad_departamento_geral.php5?id_menu=21203')
            cy.get('#FLT_COD_DEPARTAMENTO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#cad_departamento_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")

        })
    })
})