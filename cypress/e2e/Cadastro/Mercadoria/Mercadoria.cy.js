///<reference types="cypress"/>

describe('Cadastro Mercadoria', () => {
    beforeEach(() => {
        cy.login()
    })
    let testData;

    before(() => {
        cy.fixture('mercadoria').then(t => {
            testData = t

        })
    })

    context('Cadastro', () => {
        it('Cadastrar Mercadoria', () => {


            const task = testData.mercadoria


            cy.visit('http://127.0.0.1/manager/cad_mercadoria.php5?id_menu=21101')
            cy.get('#btn_Incluir').click()
            cy.get('.input-group > #COD_MERCADORIA').type(task.cod)
            cy.get('#DESCRICAO').type(task.name)
            cy.get('#COD_DEPARTAMENTO').type(task.coddepart)
            cy.get('#DIV_ABA_H_5').click()
            cy.get('#UNIDADE_VENDA').type('UN')
            cy.get('#DIV_ABA_H_10').click()
            cy.get('#COD_SITUACAO_TRIBUTARIA').select('000 - Nacional-Tributação integral')
            cy.get('#COD_TRIBUTACAO_MERCADORIA').type(task.tributa)
            cy.get('#COD_NCM').type('9401.20.00')
            cy.get('#DIV_ABA_H_19').click()
            cy.get('.confirm').click()
            cy.get('#DIV_ABA_H_19').click()
            cy.get(':nth-child(2) > .form-group > #PRECO_UNITARIO').clear()
                .type(task.valor)
            cy.get('#COD_TIPO_VENDA').select('1 - VENDA NORMAL')
            cy.get('#CLASSE_1_BOTAO').click()
            cy.msgincluir()
            cy.get('#FLT_COD_MERCADORIA').clear()
                .type(task.cod)
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.name)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_mercadoria_TBODY tr', task.cod)
                .contains('#SEL_mercadoria_TBODY tr', task.name)
                .should('be.visible')


        })
    })

    context('Alterar', () => {
        it('Alterar Mercadoria', () => {

            const task = testData.mercadoria


            cy.visit('http://127.0.0.1/manager/cad_mercadoria.php5?id_menu=21101')
            cy.get('#FLT_COD_MERCADORIA').clear()
                .type(task.cod)
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.name)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#mercadoria_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#FLT_COD_MERCADORIA').clear()
            .type(task.cod)
        cy.get('#FLT_DESCRICAO').clear()
            .type(task.namealt)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_mercadoria_TBODY tr', task.cod)
                .contains('#SEL_mercadoria_TBODY tr', task.namealt)
                .should('be.visible')

        })
    })

    context('Excluir', () => {
        it('Excluir Mercadoria', () => {

            const task = testData.mercadoria


            cy.visit('http://127.0.0.1/manager/cad_mercadoria.php5?id_menu=21101')
            cy.get('#FLT_COD_MERCADORIA').clear()
                .type(task.cod)
            cy.get('#FLT_DESCRICAO').clear()
                .type(task.namealt)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#mercadoria_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })


})