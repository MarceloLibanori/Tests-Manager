///<reference types="cypress"/>

describe('Cadastro Interpretação de texto', () => {
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
        it('Cadastrar Interpretação de texto', () => {

            const task = testData.Interpretaçãodetexto

            cy.visit('http://127.0.0.1/manager/cad_interpreta_texto.php5?id_menu=20308')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_LEGENDA').type(task.cod)
            cy.get('#LEGENDA_INFORMADA').type(task.name)
            cy.get(':nth-child(4) > .control__indicator').click()
            cy.get('#ALINHAMENTO').select(task.alinhamento)
            cy.msgincluir()
            cy.get('#FLT_COD_LEGENDA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_interpreta_texto_TBODY tr', task.name)
                .contains('#SEL_interpreta_texto_TBODY tr', task.cod)
                .should('be.visible')

        })
    })
    context('Alterar', () => {
        it('Alterar Interpretação de texto', () => {

            const task = testData.Interpretaçãodetexto

            cy.visit('http://127.0.0.1/manager/cad_interpreta_texto.php5?id_menu=20308')
            cy.get('#FLT_COD_LEGENDA').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#interpreta_texto_alterar').click()
            cy.get('#LEGENDA_INFORMADA').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_interpreta_texto_TBODY tr', task.namealt)
                .contains('#SEL_interpreta_texto_TBODY tr', task.cod)
                .should('be.visible')


        })
    })

        context('Excluir', () => {
            it('Excluir Interpretação de texto', () => {

                const task = testData.Interpretaçãodetexto

                cy.visit('http://127.0.0.1/manager/cad_interpreta_texto.php5?id_menu=20308')
                cy.get('#FLT_COD_LEGENDA').clear()
                    .type(task.cod)
                cy.get('#EXEC_FILTRO').click()
                cy.get('#interpreta_texto_excluir').click()
                cy.msgexcluir()
                cy.get('#EXEC_FILTRO').click()

            })
        })
    })
    