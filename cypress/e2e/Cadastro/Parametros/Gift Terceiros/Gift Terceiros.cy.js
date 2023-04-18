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

            const task = testData.gift

            cy.visit('http://127.0.0.1/manager/cad_gift_terceiros.php5?id_menu=20318')
            cy.get('#COD_EAN').type(task.cod)
            cy.get('#LEGENDA').type(task.name)
            cy.get('#COD_FORNECEDOR').type(task.codfor)
            cy.get('#CLASSE_1_BOTAO').click()
            cy.wait(200)
            cy.contains('#TAB_tab_gift_terceiros_TBODY td', task.codfor)
            cy.contains('#TAB_tab_gift_terceiros_TBODY td', task.name)
                      .should('be.visible')
        })
    })
    context('Alterar', () => {
        it('Alterar Garantia Estendida', () => {

            const task = testData.gift

            cy.visit('http://127.0.0.1/manager/cad_gift_terceiros.php5?id_menu=20318')
            cy.get('#OPCOES > .btn-default').click()
            cy.get('.form-group > #LEGENDA').clear()
                .type(task.namealt)
            cy.get('#CLASSE_1_BOTAO').click()
            cy.wait(200)
            cy.contains('#TAB_tab_gift_terceiros_TBODY td', task.codfor)
            cy.contains('#TAB_tab_gift_terceiros_TBODY td', task.namealt)
                
                .should('be.visible')
        })
    })
    context('Excluir', () => {
        it('Excluir Garantia Estendida', () => {

            const task = testData.gift

            cy.visit('http://127.0.0.1/manager/cad_gift_terceiros.php5?id_menu=20318')
            cy.get('#OPCOES > .btn-danger').click()
            cy.wait(200)
            cy.get('.confirm').click()

            cy.get('#OPCOES > .btn-danger').click()
            cy.wait(200)
            cy.get('.confirm').click()
        })
    })
})

