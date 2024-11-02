import component from '../support/pages/Components'
import leads from '../support/pages/Leads'
import data from '../fixtures/leads.json'

describe('Leads', () => {
  before(() => {
    cy.task('connectDB', 'DELETE from leads')
  })

  it('Deve cadastrar um lead na fila de espera', () => {
    const payload = data.create

    leads.go()
    leads.fillAndSubmitForm(payload.data)
    component.popupContainText(payload.validate)
  })

  it('Não deve cadastrar email duplicado', () => {
    const payload = data.duplicate

    cy.postLead(payload.data)

    leads.go()
    leads.fillAndSubmitForm(payload.data)
    component.popupContainText(payload.validate)
  })

  it('Não deve cadastrar um novo lead com email incorreto', () => {
    const payload = data.invalidEmail
    leads.go()
    leads.fillAndSubmitForm(payload.data)
    component.alertContain(payload.validate)
  })

  it('deve validar campos obrigatórios', () => {
    const payload = data.nullLead
    leads.go()
    leads.fillAndSubmitForm(payload.data)
    component.alertContain(payload.validate)
  })

  it('não deve registrar quando o nome do lead não for fornecido', () => {
    const payload = data.nullLeadName
    leads.go()
    leads.fillAndSubmitForm(payload.data)
    component.alertContain(payload.validate)
  })

  it('não deve registrar quando o e-mail do lead não for fornecido', () => {
    const payload = data.nullLeadEmail
    leads.go()
    leads.fillAndSubmitForm(payload.data)
    component.alertContain(payload.validate)
  })

  it('deve validar campo de nome nulo e email inválido', () => {
    const payload = data.invalidData
    leads.go()
    leads.fillAndSubmitForm(payload.data)
    component.alertContain(payload.validate)
  })
})
