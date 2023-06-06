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
        it('Cadastrar Tabela preços', () => {

            const task = testData.tabelaprecos

            cy.visit('/cad_preco_servico.php5')
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
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.descricao)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_servico_tabela_TBODY', task.descricao)
            cy.contains('#SEL_servico_tabela_TBODY', task.codserv)
                .should('be.visible')

        })
    })

    context('Alterar', () => {
        it('Alterar Tabela preços', () => {

            const task = testData.tabelaprecos

            cy.visit('/cad_preco_servico.php5')
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.descricao)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#servico_venda_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.descricaoalt)
            cy.msgalterar()
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.descricaoalt)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_servico_tabela_TBODY', task.descricaoalt)
            cy.contains('#SEL_servico_tabela_TBODY', task.codserv)
                .should('be.visible')


        })
    })
    context('Excluir', () => {
        it('Excluir Tabela preços', () => {

            const task = testData.tabelaprecos

            cy.visit('/cad_preco_servico.php5')
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.descricaoalt)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#servico_venda_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})