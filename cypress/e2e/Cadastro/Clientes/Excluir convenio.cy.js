///<reference types="cypress"/>

describe('Excluir convenio', () => {


    beforeEach(() => {
        cy.login()
    })


    let testData;

    before(() => {
        cy.fixture('tasks').then(t => {
            testData = t

        })
    })

    context('Cadastrar', () => {
        it('Cadastrar convenio', () => {

            const task = testData.altcliente


            cy.visit('/cad_cliente.php5')
            cy.buscar(task.cpf)
            cy.get('#parametro_geral_alterar').click()
            cy.get('#DIV_ABA_H_17').click()
            cy.get('#COD_CONVENIADA').type('14')
            cy.get('#CLASSE_4_BOTAO').click()
            cy.msgalterar()
            cy.get('#lgpd-enviar').click()
            cy.buscar(task.cpf)
            cy.get('#parametro_geral_alterar').click()
            cy.get('#DIV_ABA_H_17').click()
            cy.contains('#SEL_cliente_convenio_TBODY', task.convenio1)
            cy.get('#SEL_cliente_convenio_TBODY tr').should('have.length', 2)
            //   .should('be.visible')

        })
    })
    context('Excluir', () => {
        it('Excluir convenio', () => {

            const task = testData.altcliente


            cy.visit('/cad_cliente.php5')
            cy.buscar(task.cpf)
            cy.get('#parametro_geral_alterar').click()
            cy.get('#DIV_ABA_H_17').click()
            cy.get('#parametro_geral_excluir_4').click()
            cy.get('.confirm').click()
            cy.get('#parametro_geral_excluir_4').click()
            cy.get('.confirm').click()
            cy.wait(500)
            // cy.get('#btn_Salvar').click()
            cy.msgalterar()
            cy.get('#lgpd-enviar').click()
            cy.buscar(task.cpf)
            cy.get('#parametro_geral_alterar').click()
            cy.get('#DIV_ABA_H_17').click()
            cy.contains('#SEL_cliente_convenio_TBODY', task.convenio1)
            cy.get('#SEL_cliente_convenio_TBODY tr').should('have.length', 1)
            //   .should('be.visible')

        })
    })
})
