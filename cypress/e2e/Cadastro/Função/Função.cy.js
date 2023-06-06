///<reference types="cypress"/>

describe('Cadastro Função', () => {

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
        it('Cadastrar Função', () => {

            const task = testData.funcao


            cy.visit('/cad_funcao.php5')
            cy.get('#btn_Incluir').click()
            cy.get('.form-group > #COD_FUNCAO').type(task.cod)
            cy.get('#DESCRICAO').type(task.name)
            cy.get('#DIV_ABA_H_1').click()
            cy.get('#perfil_funcao > :nth-child(3) > :nth-child(1) > .form-group > .form-control > .control > .control__indicator').click()
            cy.get('#COD_PERFIL').select('OPERADOR')
            cy.get('#CLASSE_1_BOTAO').click()
            cy.msgincluir()
            cy.get('#FLT_COD_FUNCAO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_funcao_pdv_TBODY tr', task.name)
                .contains('#SEL_funcao_pdv_TBODY tr', task.cod)
                .should('be.visible')

        })
    })
    context('Alterar', () => {
        it('Alterar Função', () => {

            const task = testData.funcao


            cy.visit('/cad_funcao.php5')
            cy.get('#FLT_COD_FUNCAO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#grupo_funcao_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_funcao_pdv_TBODY tr', task.namealt)
                .contains('#SEL_funcao_pdv_TBODY tr', task.cod)
                .should('be.visible')
        })
    })
    context('Excluir', () => {
        it('Excluir Função', () => {

            const task = testData.funcao


            cy.visit('/cad_funcao.php5')
            cy.get('#FLT_COD_FUNCAO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#grupo_funcao_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")

        })
    })
})