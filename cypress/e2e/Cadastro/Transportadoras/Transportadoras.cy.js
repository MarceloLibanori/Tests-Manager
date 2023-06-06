///<reference types="cypress"/>

describe('Cadastro Transportadoras', () => {
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
        it('Cadastrar Transportadoras', () => {

            const task = testData.pj


            cy.visit('/cad_transportadora.php5')
            cy.get('#btn_Incluir').click()
            cy.get('.input-group > #COD_TRANSPORTADORA').type(task.cod)
            cy.get('#DES_RAZAO_SOCIAL').type(task.name)
            cy.get('#DES_FANTASIA').type(task.name)
            cy.get('#NUM_CNPJ_CPF').type(task.cnpj)
            cy.get('#NUM_INSC_ESTADUAL').type(task.insestadual)
            cy.msgincluir()
            cy.get('#FLT_COD_TRANSPORTADORA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_transportadora_TBODY tr', task.name)
                .should('be.visible')
        })
    })

    context('Alterar', () => {
        it('Alterar Transportadoras', () => {

            const task = testData.pj


            cy.visit('/cad_transportadora.php5')
            cy.get('#FLT_COD_TRANSPORTADORA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#transportadora_alterar').click()
            cy.get('#DES_RAZAO_SOCIAL').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_transportadora_TBODY tr', task.namealt)
                .contains('#SEL_transportadora_TBODY tr', task.name)
                .should('be.visible')
        })
    })

    context('Excluir', () => {
        it('Excluir Transportadoras', () => {

            const task = testData.pj


            cy.visit('/cad_transportadora.php5')
            cy.get('#FLT_COD_TRANSPORTADORA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#transportadora_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")

        })
    })
})