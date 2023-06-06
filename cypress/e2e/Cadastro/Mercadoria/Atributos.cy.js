///<reference types="cypress"/>

describe('Cadastro Receita(', () => {
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
        it('Cadastro Receita(', () => {


            const task = testData.atributo

            cy.visit('/cad_atributo.php5')
            cy.incluir()
            cy.get('#B_VALOR_BTN').click()
            cy.get('#DES_ATRIBUTO').type(task.descricao)
            cy.get('#DIV_ABA_H_1').click()
            cy.get('#COD_DETALHE_ATRIBUTO').type(task.codcaracter)
            cy.get('#DES_DETALHE_ATRIBUTO').type(task.descaracter)
            cy.get('#SIGLA_DETALHE_ATRIBUTO').type(task.sigla)
            cy.get('#CLASSE_1_BOTAO').click()
            cy.msgincluir()
            cy.get('#FLT_DES_ATRIBUTO').clear()
                .type(task.descricao)
            cy.get('#EXEC_FILTRO').click()

            
            cy.contains('#SEL_atributo_TBODY tr', task.descricao)
                .should('be.visible')

        })
    })
    context('Alterar', () => {
        it('Alterar Receita(', () => {


            const task = testData.atributo

            cy.visit('/cad_atributo.php5')
            cy.get('#FLT_DES_ATRIBUTO').clear()
                .type(task.descricao)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#atributo_alterar').click()
            cy.get('#DES_ATRIBUTO').clear()
                .type(task.descricaoalt)
            cy.msgalterar()
            cy.get('#FLT_DES_ATRIBUTO').clear()
                .type(task.descricaoalt)
            cy.get('#EXEC_FILTRO').click()

            
            cy.contains('#SEL_atributo_TBODY tr', task.descricaoalt)
                .should('be.visible')

        })
    })

    context('Excluir', () => {
        it('Excluir Receita(', () => {


            const task = testData.atributo

            cy.visit('/cad_atributo.php5')
            cy.get('#FLT_DES_ATRIBUTO').clear()
                .type(task.descricaoalt)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#atributo_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})
