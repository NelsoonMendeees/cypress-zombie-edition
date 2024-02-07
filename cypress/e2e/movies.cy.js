import movies from '../support/pages/Movies'
import data from '../fixtures/movies.json'
import component from '../support/pages/Components'

describe('Movies', () => {
  before(() => {
    cy.task('connectDB', 'DELETE from movies')
  })

  it('deve registrar um novo filme', () => {
    const payload = data.create

    cy.loginSession('/admin/movies')

    movies.isLoggedIn('Admin')
    movies.register(payload)
    component.popupContainText(`O filme '${payload.title}' foi adicionado ao catálogo.`)
  })

  it('deve remover um filme', () => {
    const payload = data.remove

    cy.postMovie(payload)
    cy.loginSession('/admin/movies')
    movies.isLoggedIn('Admin')

    movies.remove(payload.title)
    component.popupContainText(payload.validate)
  })

  it('não deve registrar filmes duplicados', () => {
    const payload = data.duplicate

    cy.postMovie(payload)
    cy.loginSession('/admin/movies')

    movies.isLoggedIn('Admin')
    movies.register(payload)
    component.popupContainText(payload.validate)
  })

  it('não deve cadastrar quando os campos obrigatórios não são preenchidos', () => {
    const payload = data.madatoryFields

    cy.loginSession('/admin/movies')

    movies.isLoggedIn('Admin')
    movies.register(payload)

    component.alertContain(payload.validate)
  })

  it('deve realizar busca pelo termo zumbi', () => {
    const payload = data.search

    payload.data.forEach((p) => {
      cy.postMovie(p)
    })

    cy.loginSession('/admin/movies')

    movies.isLoggedIn('Admin')

    movies.search(payload.input)

    component.rowsContains(payload.outputs)
  })
})
