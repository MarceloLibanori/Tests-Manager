///<reference types="cypress"/>

describe('Cadastro Perfil', () => {

    beforeEach(() => {
        cy.login()
    })


    context('Cadastro', () => {
        it('Cadastrar Perfil', () => {


            cy.visit('/cad_perfil.php5')
            cy.get('#btn_Incluir').click()
            cy.get('#COD_PERFIL').type('100')
            cy.get('#DESCRICAO').type('CYPRESS')
            cy.get('#STATUS_APROVADOR').select('Auditor')
            cy.msgincluir()
            cy.get('#FLT_COD_PERFIL').clear()
                .type('100')
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_perfil_TBODY tr ', 'CYPRESS')
                .should('be.visible')
        })
    })
    context('Alterar', () => {
        it('Alterar Perfil', () => {



            cy.visit('/cad_perfil.php5')
            cy.get('#FLT_COD_PERFIL').clear()
                .type('100')
            cy.get('#EXEC_FILTRO').click()
            cy.get('#perfil_alterar').click()
            cy.get('#DESCRICAO').clear()
                .type('CYPRESS 1')
            cy.get('#STATUS_APROVADOR').select('Aprovador')
            cy.msgalterar()
            cy.get('#EXEC_FILTRO').click()
            cy.contains('#SEL_perfil_TBODY tr ', 'CYPRESS 1')
                .should('be.visible')
        })
    })
    context('Excluir', () => {
        it('Excluir Perfil', () => {


            cy.visit('/cad_perfil.php5')
            cy.get('#FLT_COD_PERFIL').clear()
                .type('100')
            cy.get('#EXEC_FILTRO').click()
            cy.get('#perfil_excluir').click()
            cy.msgexcluir()
            cy.get('#EXEC_FILTRO').click()
            cy.get('.dataTables_empty').should("exist")
        })
    })
})
