///<reference types="cypress"/>

describe('Cadastro Leiaute de coletor', () => {
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
        it('Cadastro Leiaute de coletor', () => {

            const task = testData.Leiautedecoletor

            cy.visit('http://127.0.0.1/manager/cad_coletor_layout.php5')
            cy.get('#btn_Incluir').click()
            cy.get('.input-group > #COD_COLETOR_LAYOUT').type(task.cod)
            cy.get('#LINHA_INICIO_CABECALHO').type('10')
            cy.get('#LINHA_INICIO_ITENS').type('11')
            cy.get('#DESCRICAO').type(task.name)
            cy.get('#TIPO_SEPARADOR').type('2')
            cy.get('#FLG_TIPO_SEPARADOR').select('DELIMITADOR')
            cy.msgincluir()
            cy.get('#FLT_COD_COLETOR_LAYOUT').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_coletor_layout_TBODY tr', task.name)
                .contains('#SEL_coletor_layout_TBODY tr', task.cod)
                .should('be.visible')

        })
    })
    context('Alterar', () => {
        it('Alterar Leiaute de coletor', () => {

            const task = testData.Leiautedecoletor

            cy.visit('http://127.0.0.1/manager/cad_coletor_layout.php5')
            cy.get('#FLT_COD_COLETOR_LAYOUT').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#coletor_layout_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_coletor_layout_TBODY tr', task.namealt)
                .contains('#SEL_coletor_layout_TBODY tr', task.cod)
                .should('be.visible')
        })
    })

    context('Excluir', () => {
        it('Excluir Leiaute de coletor', () => {

            const task = testData.Leiautedecoletor

            cy.visit('http://127.0.0.1/manager/cad_coletor_layout.php5')
            cy.get('#FLT_COD_COLETOR_LAYOUT').clear()
            .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#coletor_layout_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})

