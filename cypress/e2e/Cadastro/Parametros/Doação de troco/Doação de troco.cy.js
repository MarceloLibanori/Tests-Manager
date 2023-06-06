///<reference types="cypress"/>

describe('Cadastro Doação de troco', () => {
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
                it('Cadastrar Doação de troco', () => {

                    const task = testData.doacao

                    cy.visit('/cad_troco_doacao.php5')
                    cy.get('#btn_Incluir').click()
                    cy.get('#TIPO_DOACAO').select(task.tpdoacao)
                    cy.get('#VALOR_MIN_DOACAO').type(task.vlminimo)
                    cy.get('#VALOR_MAX_DOACAO').type(task.vlmaximo)
                    cy.msgincluir()
                    cy.get('#FLT_TIPO_DOACAO').type('Troco Simples')
                    cy.get('#EXEC_FILTRO').click()

                    cy.contains('#SEL_troco_doacao_TBODY tr', task.tpdoacao)
                        .should('be.visible')
                })
            })
            context('Alterar', () => {
                it('Alterar Doação de troco', () => {

                    const task = testData.doacao

                    cy.visit('/cad_troco_doacao.php5')
                    cy.get('#FLT_TIPO_DOACAO').type(task.tpdoacao)
                    cy.get('#EXEC_FILTRO').click()
                    cy.get('#troco_doacao_alterar').click()
                    cy.get('#VALOR_MAX_DOACAO').clear()
                        .type(task.vlmaximoalt)
                    cy.msgalterar()
                    cy.get('#EXEC_FILTRO').click()
                    cy.get('#troco_doacao_alterar').click()
                    cy.get('#VALOR_MAX_DOACAO').should('have.value', task.vlmaximoalt)
                    cy.get('#VALOR_MIN_DOACAO').should('have.value', task.vlminimo)
                })
            })

            context('Excluir', () => {
                it('Excluir Doação de troco', () => {

                    const task = testData.doacao

                    cy.visit('/cad_troco_doacao.php5')
                    cy.get('#FLT_TIPO_DOACAO').type('Troco Simples')
                    cy.get('#EXEC_FILTRO').click()
                    cy.get('#troco_doacao_excluir').click()
                    cy.msgexcluir()
                    cy.get('#EXEC_FILTRO').click()
                    cy.get('.dataTables_empty').should("exist")
                })
            })
        })