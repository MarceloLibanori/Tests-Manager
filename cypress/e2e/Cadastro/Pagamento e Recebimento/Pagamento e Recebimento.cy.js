///<reference types="cypress"/>

describe('Cadastro Pagamento e Recebimento', () => {

    beforeEach(() => {
        cy.login()
    })


    context('Cadastro', () => {
        it('Cadastrar Pagamento e Recebimento', () => {


            cy.visit('http://127.0.0.1/manager/cad_pagamento_recebimento.php5?id_menu=204')
            cy.get('#btn_Incluir').click()
            cy.get('.input-group > #COD_PAGAMENTO_RECEBIMENTO').type('2412')
            cy.get('#DESCRICAO').type('CURSO CYPRESS')
            cy.get('#CLASSE_FINAL_PERMITE_DIV > :nth-child(1) > .control__indicator').click()
            cy.get('#CLASSE_FINAL_PERMITE_DIV > :nth-child(3) > .control__indicator').click()
            cy.get('#CLASSE_FINAL_PERMITE_DIV > :nth-child(5) > .control__indicator').click()
            cy.get('#CLASSE_FINAL_PERMITE_DIV > :nth-child(7) > .control__indicator').click()
            cy.get('#CLASSE_FINAL_PERMITE_DIV > :nth-child(9) > .control__indicator').click()
            cy.get('#DIV_ABA_H_5').click()
            cy.get('#COD_VALOR').type('100')
            cy.get('#CLASSE_2_BOTAO').click()
            cy.msgincluir()
            cy.get('#FLT_COD_PAGAMENTO_RECEBIMENTO').clear()
                .type('2412')
            cy.get('#EXEC_FILTRO').click()


            cy.contains('#SEL_pagamento_recebimento_TBODY tr ', 'CURSO CYPRESS')
                .should('be.visible')

        })
    })

    context('Alterar', () => {
        it('Alterar Pagamento e Recebimento', () => {


            cy.visit('http://127.0.0.1/manager/cad_pagamento_recebimento.php5?id_menu=204')
            cy.get('#FLT_COD_PAGAMENTO_RECEBIMENTO').clear()
                .type('2412')
            cy.get('#EXEC_FILTRO').click()
            cy.get('#pagamento_recebimento_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type('CURSO CYPRESS 2')
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_pagamento_recebimento_TBODY tr ', 'CURSO CYPRESS 2')
                .should('be.visible')

        })
    })

    context('Excluir', () => {
        it('Excluir Pagamento e Recebimento', () => {


            cy.visit('http://127.0.0.1/manager/cad_pagamento_recebimento.php5?id_menu=204')
            cy.get('#FLT_COD_PAGAMENTO_RECEBIMENTO').clear()
                .type('2412')
            cy.get('#EXEC_FILTRO').click()
            cy.get('#pagamento_recebimento_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")

        })

    })
})
