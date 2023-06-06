///<reference types="cypress"/>

describe('Cadastro Serviços', () => {

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
        it('Cadastrar Serviços', () => {

            const task = testData.servicos

            cy.visit('/cad_produto_servico.php5')
            cy.incluir()
            cy.get('#COD_SERVICO').type(task.cod)
            cy.get('#DESCRICAO').type(task.descricao)
            cy.msgincluir()
            cy.get('#FLT_COD_SERVICO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_servico_venda_TBODY td', task.descricao)
            cy.contains('#SEL_servico_venda_TBODY td', task.cod)
                .should('be.visible')

        })
    })
    context('Alterar', () => {
        it('Alterar Serviços', () => {

            const task = testData.servicos

            cy.visit('/cad_produto_servico.php5')
            cy.get('#FLT_COD_SERVICO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#servico_venda_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.descricaoalt)
            cy.get('#VAL_SERVICO').clear()
                .type(task.valor)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_servico_venda_TBODY td', task.descricaoalt)
            cy.contains('#SEL_servico_venda_TBODY td', task.cod)
            cy.contains('#SEL_servico_venda_TBODY td', task.valor)
                .should('be.visible')
        })
    })

    context('Excluir', () => {
        it('Excluir Serviços', () => {

            const task = testData.servicos

            cy.visit('/cad_produto_servico.php5')
            cy.get('#FLT_COD_SERVICO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#servico_venda_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})