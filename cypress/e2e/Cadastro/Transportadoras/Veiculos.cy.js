///<reference types="cypress"/>

describe('Cadastro Veiculos', () => {
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
        it('Cadastrar Veiculos', () => {

            const task = testData.pj


            cy.visit('http://127.0.0.1/manager/cad_veiculo.php5?id_menu=21702')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_VEICULO').type(task.cod)
            cy.get('#MARCA_VEICULO').type(task.name)
            cy.get('#MODELO_VEICULO').type(task.name)
            cy.get('#PLACA_VEICULO').type('CUC9R61')
            cy.msgincluir()
            cy.get('#FLT_COD_VEICULO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_veiculo_TBODY tr', task.name)
                .contains('#SEL_veiculo_TBODY tr', 'CUC9R61')
                .should('be.visible')

        })
    })
    context('Alterar', () => {
        it('Alterar Veiculos', () => {

            const task = testData.pj


            cy.visit('http://127.0.0.1/manager/cad_veiculo.php5?id_menu=21702')
            cy.get('#FLT_COD_VEICULO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#veiculo_alterar').click()
            cy.get('#MARCA_VEICULO').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_veiculo_TBODY tr', task.namealt)
                .contains('#SEL_veiculo_TBODY tr', 'CUC9R61')
                .should('be.visible')

        })
    })

    context('Excluir', () => {
        it('Excluir Veiculos', () => {

            const task = testData.pj

            cy.visit('http://127.0.0.1/manager/cad_veiculo.php5?id_menu=21702')
            cy.get('#FLT_COD_VEICULO').clear()
                .type(task.cod)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#veiculo_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})