///<reference types="cypress"/>

describe('Cadastro Premiação Aleatoria', () => {
    beforeEach(() => {
        cy.login()
    })
    let testData;

    before(() => {
        cy.fixture('datas').then(t => {
            testData = t

        })
    })

    context('Cadastro', () => {
        it('Cadastrar Premiação Aleatoria', () => {

            const task = testData.datas1


            cy.visit('http://127.0.0.1/manager/cad_premiacao.php5')
            cy.get('#btn_Incluir').click()
            cy.get('.input-group > #COD_PREMIO').type(task.cod)
            cy.get('#DESCRICAO').type(task.name)
            cy.get('#MENSAGEM').type(task.name)
            cy.get('#MENSAGEM_IMPRESSAO').type(task.name)
            cy.get('#DIV_ABA_H_1').click()
            cy.get('#DTA_INICIO').type(task.datainicio)
            cy.get('#DTA_TERMINO').type(task.datafim)
            cy.get('#VAL_MINIMO').type('0,00')
            cy.get('#VAL_MAXIMO').type('20,00')
            cy.get('#VENDAS_CONCEDER').type('1,00')
            cy.get('#MAX_PREMIO_DIA').type('10')
            cy.get('#TEMPO_MINIMO').type('180')
            cy.get('#DIV_ABA_H_2').click()
            cy.get('#COD_TIPO_VENDA').select('1 - VENDA NORMAL')
            cy.get('#CLASSE_1_BOTAO').click()
            cy.msgincluir()
            cy.get('#FLT_COD_PREMIO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_premiacao_TBODY tr', task.name)
                .should('be.visible')

        })
    })
    context('Alterar', () => {
        it('Alterar Premiação Aleatoria', () => {

            const task = testData.datas1


            cy.visit('http://127.0.0.1/manager/cad_premiacao.php5')
            cy.get('#FLT_COD_PREMIO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#premio_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_premiacao_TBODY tr', task.namealt)
                .should('be.visible')
        })
    })
    context('Excluir', () => {
        it('Excluir Premiação Aleatoria', () => {

            const task = testData.datas1


            cy.visit('http://127.0.0.1/manager/cad_premiacao.php5')
            cy.get('#FLT_COD_PREMIO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#premio_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")

        })
    })
})

