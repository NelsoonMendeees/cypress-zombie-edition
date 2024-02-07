class Leads {
  go() {
    cy.visit('/')

    cy.title().should('contain', 'Zombie+ | Mais que um streaming, uma experiência arrepiante!')
  }

  fillAndSubmitForm(payload) {
    cy.contains('button', 'Aperte o play... se tiver coragem').should('be.visible').click()

    cy.get('[data-testid=modal]')
      .should('be.visible')
      .should('contain', 'Fila de espera')
      .should('contain', 'Faça o pré-cadastro e receba uma oferta especial na semana do lançamento.')

    payload.name ? cy.get('input[placeholder*=nome]').type(payload.name) : cy.log('Lead Name null')
    payload.email ? cy.get('input[placeholder*=email]').type(payload.email) : cy.log('Lead Email null')

    cy.contains('button', 'Quero entrar na fila!').click()
  }
}

export default new Leads()
