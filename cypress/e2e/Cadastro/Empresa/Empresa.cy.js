///<reference types="cypress"/>

describe('Cadastro Empresa', () => {
    beforeEach(() => {
        cy.login()
    })
    let testData;

    before(() => {
        cy.fixture('Empresa').then(t => {
            testData = t

        })
    })
    context('Cadastro', () => {
        it('Cadastrar Empresa', () => {
            const task = testData.empresa

           
            cy.visit('http://127.0.0.1/manager/cad_empresa_pai.php5')
            cy.incluir()
            cy.get('#COD_EMPRESA').type(task.cod)
            cy.get('#DES_EMPRESA').type(task.name)
            cy.get('#DIV_ABA_H_1').click()
            cy.get('#COD_GRUPO_LOJA').type(task.grulj)
            cy.get('#DES_GRUPO_LOJA').type(task.deslj)
            cy.get('#CLASSE_1_BOTAO').click()
            cy.msgincluir()
            cy.get('#FLT_COD_EMPRESA').clear()
            .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_empresa_pai_TBODY', task.cod)
                .contains('#SEL_empresa_pai_TBODY', task.name)
                .should('be.visible')

        })
    })
    context('Alterar', () => {
        it('Alterar Empresa', () => {
            const task = testData.empresa

           
            cy.visit('http://127.0.0.1/manager/cad_empresa_pai.php5')
            cy.get('#FLT_COD_EMPRESA').clear()
            .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#empresa_alterar').click()
            cy.get('#DES_EMPRESA').clear()
                .type(task.namealt)
            cy.get('#EMAIL_OUVIDORIA').type(task.email)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_empresa_pai_TBODY', task.cod)
                .contains('#SEL_empresa_pai_TBODY', task.namealt)
                .contains('#SEL_empresa_pai_TBODY', task.email)
                .should('be.visible')

        })
    })
    context('Excluir', () => {
        it('Excluir Empresa', () => {
            const task = testData.empresa

          
            cy.visit('http://127.0.0.1/manager/cad_empresa_pai.php5')
            cy.get('#FLT_COD_EMPRESA').clear()
            .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#empresa_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()

            cy.get('.dataTables_empty').should("exist")





        })
    })
})
