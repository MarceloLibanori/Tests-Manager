// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// References:
// https://docs.cypress.io/api/commands/session
// https://www.cypress.io/blog/2021/08/04/authenticate-faster-in-tests-cy-session-command/
// https://talkingabouttesting.com/2021/08/07/autentique-testes-mais-rapido-com-o-comando-cy-session    
Cypress.Commands.add('login', (
    username = Cypress.env('1'),
    password = Cypress.env('2291755')
) => {
    cy.session([username, password], () => {
        cy.visit('http://127.0.0.1/manager/login.php5')
        cy.get('#USUARIO').type('1')
        cy.get('#SENHA').type('2291755', { log: false })
        cy.get('.btn').click()
        //cy.get('.btn').click()     
    })
})
//Cypress.Commands.add('login', (user, senha) => {
//    cy.visit('http://127.0.0.1/manager/login.php5')
//    cy.get('#USUARIO').type('1');
//    cy.get('#SENHA').type('2291755');
//    cy.get('.btn').click();

//s})

Cypress.Commands.add('filtra', (filtrar) => {
    cy.get('#btn_Search').click()
    
      
    

})

Cypress.Commands.add('buscar', (busca) => {
    cy.get('#FLT_NUM_CGC').clear()
        .type(busca)
    cy.get('#EXEC_FILTRO').click()

})




Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

Cypress.Commands.add('incluir', (cpf, buton) => {
    cy.get('#btn_Incluir').click()

})

Cypress.Commands.add('msgalterar', (msgalterar) => {
    cy.get('#btn_Salvar').click()
    cy.get('#alert_message_internal').should('have.text', 'Operação(Alt) Executada com Sucesso.')
    cy.get('.confirm').click()

})
Cypress.Commands.add('msgvigencia', (msgalterar) => {
    cy.get('#btn-incluir').click()
    cy.get('#alert_message_internal').should('have.text', 'Vigï¿½ncia cadastrada com sucesso!Para sair desta tela clique em "Voltar ao menu".')
    cy.get('.confirm').click()

})


Cypress.Commands.add('msgexcluir', (msgexcluir) => {

    cy.get('#btn_Salvar').click()
    cy.get('.sa-success').should("exist")
    cy.get('#alert_message_internal').should('have.text', 'Operação(Exc) Executada com Sucesso.')
    cy.get('.confirm').click()

})

Cypress.Commands.add('msgincluir', (msgincluir) => {
    cy.get('#btn_Salvar').click()
    cy.get('#alert_message_internal').should('have.text', 'Operação(Inc) Executada com Sucesso.')
    cy.get('.confirm').click()

})

Cypress.Commands.add('endereco', (Endereco) => {
    cy.get('#DIV_ABA_H_1').click()
    cy.get('#ID_MUNICIPIO').type('3896')
    cy.get('#DES_ENDERECO').type('rua do imperador')
    cy.get('#NUMERO').type('151')
    cy.get('#DES_BAIRRO').type('vila guilherme')
    cy.get('#NUM_CEP').type('02074001')

})     