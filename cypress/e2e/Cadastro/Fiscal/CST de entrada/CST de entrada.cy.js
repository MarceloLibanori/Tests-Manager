///<reference types="cypress"/>

describe('Cadastro CST de entrada', () => {
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
        it('Cadastrar CST de entrada', () => {

            const task = testData.cstentrada

            cy.visit('http://127.0.0.1/manager/cad_cst_entrada.php5')
            cy.incluir()
            cy.get('#FLG_TIPO_IMPOSTO').select(task.tpimposto)
            cy.get('#CST_SAIDA').select(task.cstsaida)
            cy.get('#CST_ENTRADA').select(task.cstentrada)
            cy.msgincluir()
            cy.get('#FLT_FLG_TIPO_IMPOSTO').select(task.tpimposto)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_cst_entrada_TBODY tr', task.tpimposto)
                .should('be.visible')
        })
    })

    context('Alterar', () => {
        it('Alterar CST de entrada', () => {

            const task = testData.cstentrada

            cy.visit('http://127.0.0.1/manager/cad_cst_entrada.php5')
            cy.get('#FLT_FLG_TIPO_IMPOSTO').select(task.tpimposto)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#cst_entrada_alterar').click()
            cy.get('#CST_ENTRADA').select(task.cstentradaalt)
            cy.msgalterar()
            cy.get('#FLT_FLG_TIPO_IMPOSTO').select(task.tpimposto)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_cst_entrada_TBODY tr', task.tpimposto)
            cy.contains('#SEL_cst_entrada_TBODY tr', '5')
                .should('be.visible')

        })
    })

    context('Excluir', () => {
        it('Excluir CST de entrada', () => {

            const task = testData.cstentrada

            cy.visit('http://127.0.0.1/manager/cad_cst_entrada.php5')
            cy.get('#FLT_FLG_TIPO_IMPOSTO').select(task.tpimposto)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#cst_entrada_excluir').click()
            cy.msgexcluir()
            cy.get('#FLT_FLG_TIPO_IMPOSTO').select(task.tpimposto)
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })

    })
})
