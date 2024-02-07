import login from '../support/pages/Login'
import data from '../fixtures/login.json'
import component from '../support/pages/Components'
import movies from '../support/pages/Movies'

describe('Login', () => {
  it('deve fazer login como administrador', () => {
    const payload = data.success

    login.go()
    login.fillAndSubmitLogin(payload)
    movies.isLoggedIn(payload.name)
  })

  it('não deve fazer login com um usuário inválido', () => {
    const payload = data.invalidUser

    login.go()
    login.fillAndSubmitLogin(payload.data)
    component.popupContainText(payload.validate)
  })

  it('não deve fazer login com uma senha incorreta', () => {
    const payload = data.incorrectPassword

    login.go()
    login.fillAndSubmitLogin(payload.data)
    component.popupContainText(payload.validate)
  })

  it('não deve fazer login com um e-mail incorreto', () => {
    const payload = data.incorrectEmail

    login.go()
    login.fillAndSubmitLogin(payload.data)
    component.alertContain(payload.validate)
  })

  it('não deve fazer login quando nenhum campo estiver preenchido', () => {
    const payload = data.nullFields

    login.go()
    login.fillAndSubmitLogin(payload.data)
    component.alertContain(payload.validate)
  })

  it('deve validar campo de e-mail inválido e senha nula', () => {
    const payload = data.invalidEmailNullPass

    login.go()
    login.fillAndSubmitLogin(payload.data)
    component.alertContain(payload.validate)
  })
})
