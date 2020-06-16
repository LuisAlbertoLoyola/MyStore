describe('Login', () => {
    it('Redirecciona al home si el login es exitoso', () => {
      cy.visit('http://localhost:8080/login')
      cy.get('.navbar-burger').click()
      cy.get('#email').type('user1@mystore.com')
      cy.get('#password').type('password')
      cy.get('button.is-primary').click()
      cy.get('.navbar-burger').click()
      cy.get('#navbarMenu').contains('Usuario')
    })
})