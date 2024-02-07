class Login {
  go() {
    cy.visit('admin/login')
    cy.get('img[alt=Logo]').should('be.visible')
  }

  fillAndSubmitLogin(payload) {
    payload.email ? cy.get('[placeholder*=mail]').type(payload.email) : cy.log('Email null')
    payload.password ? cy.get('[placeholder=Senha]').type(payload.password) : cy.log('password null')

    cy.contains('button', 'Entrar').click()
  }
}

export default new Login()
