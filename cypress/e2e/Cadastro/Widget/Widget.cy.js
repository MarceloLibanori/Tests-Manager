///<reference types="cypress"/>

describe('Cadastro Widget', () => {
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
        it('Cadastrar Widget', () => {

            const task = testData.datas


            cy.visit('/cad_widget.php5')
            cy.get('#btn_Incluir').click()
            cy.get(':nth-child(1) > :nth-child(1) > .form-group > #LABEL_WIDGET').type(task.name)
            cy.get('#DIV_ABA_H_1').click()
            cy.get(':nth-child(2) > :nth-child(1) > .form-group > #LABEL_WIDGET').type('no prazo')
            cy.get('#COR_WIDGET').type('#e21f1f')
            cy.get('.ui-colorpicker-ok')
            cy.get('#PRAZO_DIAS_INI').type('10')
            cy.get('#PRAZO_DIAS_FIM').type('10')
            cy.get('#CLASSE_1_BOTAO').click()
            cy.get('#DIV_ABA_H_2').click()
            cy.get('#COD_PERFIL').select('OPERADOR')
            cy.get('#CLASSE_2_BOTAO').click()
            cy.msgincluir()
            cy.get('#FLT_LABEL_WIDGET').clear()
                .type(task.name)
            cy.get('#EXEC_FILTRO').click()

            cy.contains('#SEL_widget_TBODY tr', task.name)
                .should('be.visible')

        })
    })
    context('Alterar', () => {
        it('Alterar Widget', () => {

            const task = testData.datas


            cy.visit('/cad_widget.php5')
            cy.get('#FLT_LABEL_WIDGET').clear()
                .type(task.name)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#cad_widget_alterar').click()
            cy.get(':nth-child(2) > .form-group > #LABEL_WIDGET').clear()
                .type(task.namealt)
            cy.msgalterar()
            cy.get('#FLT_LABEL_WIDGET').clear()
                .type(task.namealt)
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_widget_TBODY tr', task.namealt)
                .should('be.visible')
        })
    })
    context('Excluir', () => {
        it('Excluir Widget', () => {

            const task = testData.datas


            cy.visit('/cad_widget.php5')
            cy.get('#FLT_LABEL_WIDGET').clear()
                .type(task.namealt)
            cy.get('#EXEC_FILTRO').click()
            cy.get('#cad_widget_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})