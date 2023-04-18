///<reference types="cypress"/>

describe('Cadastro Tabela preços', () => {

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
        it.only('Cadastrar Tabela preços', () => {

            const task = testData.tabelaprecos

            cy.visit('http://127.0.0.1/manager/cad_preco_servico.php5?id_menu=22202')
            cy.incluir()
            cy.get('#COD_SERVICO').select(task.codserv)
            cy.get('#COD_SERVICO_TABELA').type(task.cod)
            cy.get('#DESCRICAO').type(task.descricao)
            cy.get('#DIV_ABA_H_1').click()
            cy.get('#COD_ITEM_SERVICO').type(task.cod)
            cy.get(':nth-child(2) > .form-group > #DESCRICAO').type(task.descricao)
            cy.get('#VAL_SERVICO').type(task.valor)
            cy.get('#CLASSE_1_BOTAO').click()
            cy.msgincluir()
            cy.get('#FLT_COD_SERVICO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_servico_tabela_TBODY', task.descricao)
            cy.contains('#SEL_servico_tabela_TBODY', task.cod)
            cy.contains('#SEL_servico_tabela_TBODY', task.codserv)
                .should('be.visible')

        })
    })

    context('Alterar', () => {
        it('Alterar Tabela preços', () => {

            const task = testData.tabelaprecos

            cy.visit('http://127.0.0.1/manager/cad_preco_servico.php5?id_menu=22202')
            cy.get('#FLT_COD_SERVICO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()


        })
    })
})