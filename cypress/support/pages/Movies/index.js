class Movies {
  register(payload) {
    cy.get('a[href$=register]').click()

    cy.contains('h1', 'Cadastrar novo Filme').should('be.visible')

    payload.title ? cy.get('#title').type(payload.title) : cy.log('Title null')

    payload.overview ? cy.get('#overview').type(payload.overview) : cy.log('Overview null')

    payload.company
      ? cy
          .get('#select_company_id')
          .click()
          .parent()
          .find('.react-select__option')
          .contains(payload.company)
          .scrollIntoView()
          .click()
      : cy.log('Company null')

    payload.release_year
      ? cy
          .get('#select_year')
          .click()
          .parent()
          .find('.react-select__option')
          .contains(payload.release_year)
          .scrollIntoView()
          .click()
      : cy.log('Release Year null')

    payload.cover
      ? cy.get('[type="file"]').selectFile(payload.cover, { force: true })
      : cy.log('Cover null')

    payload.featured ? cy.get('.featured .react-switch').click() : cy.log('Featured false')

    cy.contains('button', 'Cadastrar').click()
  }

  remove(title) {
    cy.contains('.title', title).parent().find('.remove-item').click()
    cy.get('.confirm-removal').should('be.visible').click()
  }

  search(title) {
    cy.get('input[placeholder*=Busque]').type(title)
    cy.get('.actions').parent().find('button').click()
  }

  isLoggedIn(name) {
    cy.get('.logged-user').should('be.visible').should('have.text', `Olá, ${name}`)
  }
}

export default new Movies()
