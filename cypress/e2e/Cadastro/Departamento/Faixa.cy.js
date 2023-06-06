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

            const task = testData.faixa

           
            cy.visit('/cad_faixa_departamento.php5')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_FAIXA_DEPARTAMENTO').type(task.cod)
            cy.get('#DESCRICAO').type(task.name)
            cy.msgincluir()
            cy.get('#FLT_COD_FAIXA_DEPARTAMENTO').type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_faixa_departamento_TBODY', task.name)
                .contains('#SEL_faixa_departamento_TBODY', task.cod)
                .should('be.visible')

        })
    })
    context('Alterar', () => {
        it('Alterar Departamento Geral', () => {

            const task = testData.faixa

           
            cy.visit('/cad_faixa_departamento.php5')
            cy.get('#FLT_COD_FAIXA_DEPARTAMENTO').clear()
            .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#faixa_departamento_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_faixa_departamento_TBODY', task.namealt)
                .contains('#SEL_faixa_departamento_TBODY', task.cod)
                .should('be.visible')

        })
    })

    context('Exluir', () => {
        it('Excluir Departamento Geral', () => {

            const task = testData.faixa

           
            cy.visit('/cad_faixa_departamento.php5')
            cy.get('#FLT_COD_FAIXA_DEPARTAMENTO').clear()
            .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#faixa_departamento_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()

            cy.get('.dataTables_empty').should("exist")
        })
    })
})