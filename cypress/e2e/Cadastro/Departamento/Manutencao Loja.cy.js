///<reference types="cypress"/>

describe('Cadastro Departamento loja', () => {
    beforeEach(() => {
        cy.login()
    })

    let testData;

    before(() => {
        cy.fixture('departamento').then(t => {
            testData = t

        })
    })

    context('Cadastro', () => {
        it('Cadastrar Departamento loja', () => {

            const task = testData.departamentoloja


            cy.visit('http://127.0.0.1/manager/cad_departamento.php5#')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_DEPARTAMENTO').type(task.cod)
            cy.get('#DESCRICAO').type(task.name)
            cy.msgincluir()
            cy.get('#FLT_COD_DEPARTAMENTO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_departamento_TBODY', task.name)
                .contains('#SEL_departamento_TBODY', task.cod)
                .should('be.visible')

        })
    })

    context('Botão Arvore', () => {
        it('Botão Arvore', () => {

            const task = testData.departamentoloja



            cy.visit('http://127.0.0.1/manager/cad_departamento.php5#')
            cy.get('#FLT_COD_DEPARTAMENTO').clear()
                .type('401')
            cy.get('#EXEC_FILTRO').click()
            cy.get('#departamento_Árvore').click()

            cy.get('#SC_CONTENT > table > tbody > :nth-child(1) > td').should('have.text', '40-GERAL')
            cy.get(':nth-child(2) > td').should('have.text', '401-ELETRO')
        })
    })

    context('Botão Produto', () => {
        it('Botão Produto', () => {

            const task = testData.departamentoloja


            cy.visit('http://127.0.0.1/manager/cad_departamento.php5#')
            cy.get('#FLT_COD_DEPARTAMENTO').clear()
                .type('401')
            cy.get('#EXEC_FILTRO').click()
            cy.get('#departamento_produtos').click()


            cy.contains('#SEL_mercadoria_TBODY tr', '00000000000004011')
                .contains('#SEL_mercadoria_TBODY tr', 'PRANCHA ELETRICA BRITANIA')
                .should('be.visible')


        })
    })
    context('Alterar', () => {
        it('Alterar Departamento loja', () => {

            const task = testData.departamentoloja


            cy.visit('http://127.0.0.1/manager/cad_departamento.php5#')
            cy.get('#FLT_COD_DEPARTAMENTO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#departamento_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.get('#COD_DEPARTAMENTO_PAI').type(task.codpai)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_departamento_TBODY', task.namealt)
                .contains('#SEL_departamento_TBODY', task.cod)
                .contains('#SEL_departamento_TBODY', '1-TESTE GERAL PAI')
                .should('be.visible')

        })
    })
    context('Excluir', () => {
        it('Excluir Departamento loja', () => {

            const task = testData.departamentoloja


            cy.visit('http://127.0.0.1/manager/cad_departamento.php5#')
            cy.get('#FLT_COD_DEPARTAMENTO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#departamento_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")

        })
    })
})
