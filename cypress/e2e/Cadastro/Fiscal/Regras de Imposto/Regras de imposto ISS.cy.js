///<reference types="cypress"/>

describe('Cadastro Regras de imposto ISS', () => {
    beforeEach(() => {
        cy.login()
    })
    let testData;

    before(() => {
        cy.fixture('fiscal').then(t => {
            testData = t

        })
    })

    context('Cadastro', () => {
        it('Cadastrar Regras de imposto ISS', () => {

            const task = testData.iss

            cy.visit('/adm_regras_impostos.php5')
            cy.get('#btn_regra_iss').click()
            cy.get('#btn_Incluir').click()
            cy.wait(500)
            cy.get('#MUNICIPIO_ORIGEM').type(task.uforigem)
            cy.get('#CST').select('I - Isenta')
            cy.get('#DESCRICAO').type(task.name)
            cy.msgincluir()
            cy.get('#FLT_DESCRICAO').type(task.name)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_regras_icms_TBODY', task.name)
                .should('be.visible')
        })
    })
    context('Alterar', () => {
        it('Alterar Regras de imposto ISS', () => {

            const task = testData.iss


            cy.visit('/adm_regras_impostos.php5')
            cy.get('#btn_regra_iss').click()
            cy.wait(500)
            cy.get('#FLT_DESCRICAO').type(task.name)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#regras_icms_alterar').click()
            cy.get('#MUNICIPIO_ORIGEM').clear()
            .type(task.uforigem)
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.intercept('#DESCRICAO')
            cy.msgalterar()
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.namealt)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_regras_icms_TBODY', task.namealt)
                .should('be.visible')

        })
    })
    context('Excluir', () => {
        it('Excluir Regras de imposto ISS', () => {

            const task = testData.iss


            cy.visit('/adm_regras_impostos.php5')
            cy.get('#btn_regra_iss').click()
            cy.visit('/adm_regras_impostos.php5')
            cy.intercept('#DESCRICAO')
            cy.wait(500)
            cy.get('#FLT_DESCRICAO').type(task.namealt)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#regras_icms_excluir').click()
            cy.msgexcluir()
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.namealt)
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")

        })

    })
})

