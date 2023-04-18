///<reference types="cypress"/>

describe('Cadastro Tipo movimento tesouraria', () => {
    beforeEach(() => {
        cy.login()
    })
    let testData;

    before(() => {
        cy.fixture('finalizadora').then(t => {
            testData = t

        })
    })

    context('Cadastro', () => {
        it('Cadastrar Tipo movimento tesouraria', () => {

            const task = testData.finalizadora


            cy.visit('http://127.0.0.1/manager/cad_tipo_mov_tesouraria.php5?id_menu=214')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_TIPO_MOV_TESOURARIA').type(task.cod)
            cy.get('#DES_TIPO_MOV_TESOURARIA').type(task.name)
            cy.msgincluir()
            cy.get('#FLT_COD_TIPO_MOV_TESOURARIA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_tipo_mov_tesouraria_TBODY tr', task.name)
                .should('be.visible')

        })
    })

    context('Alterar', () => {
        it('Alterar Tipo movimento tesouraria', () => {

            const task = testData.finalizadora



            cy.visit('http://127.0.0.1/manager/cad_tipo_mov_tesouraria.php5?id_menu=214')
            cy.get('#FLT_COD_TIPO_MOV_TESOURARIA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#parametro_geral_alterar').click()
            cy.get('#DES_TIPO_MOV_TESOURARIA').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_tipo_mov_tesouraria_TBODY tr', task.namealt)
                .should('be.visible')


        })
    })

    context('Excluir', () => {
        it('Excluir Tipo movimento tesouraria', () => {

            const task = testData.finalizadora


            cy.visit('http://127.0.0.1/manager/cad_tipo_mov_tesouraria.php5?id_menu=214')
            cy.get('#FLT_COD_TIPO_MOV_TESOURARIA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#parametro_geral_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})
