///<reference types="cypress"/>

describe('Cadastro Garantia Estendida', () => {
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
        it('Cadastrar Garantia Estendida', () => {

            const task = testData.garantiaestendida

            cy.visit('http://127.0.0.1/manager/cad_garantia_extendida.php5?id_menu=20302')
            cy.get('#btn_Incluir').click()
            cy.get('.input-group > #GRUPO_GARANTIA').type(task.cod)
            cy.get(':nth-child(1) > .form-group > #DESCRICAO').type(task.descricao)
            cy.get('#DIV_ABA_H_1').click()
            cy.get(':nth-child(2) > .form-group > #DESCRICAO').type(task.descricao)
            cy.get('#VALOR_GARANTIA').type(task.vlgarantia)
            cy.get('#CLASSE_1_BOTAO').click()
            cy.msgincluir()
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.descricao)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_garantia_extendida_TBODY tr', task.descricao)
                .should('be.visible')
        })
    })
    context('Alterar', () => {
        it('Alterar Garantia Estendida', () => {

            const task = testData.garantiaestendida

            cy.visit('http://127.0.0.1/manager/cad_garantia_extendida.php5?id_menu=20302')
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.descricao)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#garantia_extendida_alterar').click()
            cy.get(':nth-child(1) > .form-group > #DESCRICAO').clear()
                .type(task.descricaoalt)
            cy.msgalterar()
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.descricaoalt)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_garantia_extendida_TBODY tr', task.descricaoalt)
                .should('be.visible')

        })
    })
    context('Excluir', () => {
        it('Excluir Garantia Estendida', () => {

            const task = testData.garantiaestendida

            cy.visit('http://127.0.0.1/manager/cad_garantia_extendida.php5?id_menu=20302')
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.descricaoalt)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#garantia_extendida_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()

            cy.get('#SEL_garantia_extendida_TBODY tr').should('have.length', 1)
            cy.get('.dataTables_empty').should("exist")

        })
    })
})