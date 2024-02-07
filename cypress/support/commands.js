Cypress.Commands.add('postLead', (payload) => {
  cy.request({
    url: 'http://localhost:3333/leads',
    method: 'POST',
    body: payload,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eql(201)
  })
})

Cypress.Commands.add('postMovie', (payload) => {
  cy.fixture(`covers/movies/${payload.image}`, 'binary')
    .then((image) => Cypress.Blob.binaryStringToBlob(image, 'image/jpg'))
    .then((blob) => {
      const formData = new FormData()

      cy.getToken().then((respSession) => {
        cy.getCompanyId(respSession.body.token, payload.company).then((companyId) => {
          formData.append('title', payload.title)
          formData.append('overview', payload.overview)
          formData.append('release_year', payload.release_year)
          formData.append('company_id', companyId.body.data[0].id)
          formData.append('featured', payload.featured)
          formData.append('cover', blob, payload.image)

          cy.request({
            url: 'http://localhost:3333/movies',
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${respSession.body.token}`,
              Accept: 'application/json, text/plain, */*'
            },
            body: formData
          }).then((response) => {
            expect(response.status).to.eql(201)
          })
        })
      })
    })
})

Cypress.Commands.add('loginSession', (page) => {
  const payload = { email: 'admin@zombieplus.com', password: 'pwd123' }
  cy.session([payload.email, payload.password], () => {
    cy.getToken(payload).then((response) => {
      expect(response.status).to.eql(200)

      window.sessionStorage.setItem('@ZombiePlus:token', response.body.token)
      window.sessionStorage.setItem('@ZombiePlus:user', JSON.stringify(response.body.user))
    })
  })
  cy.visit(page)
})

Cypress.Commands.add('getToken', () => {
  const payload = { email: 'admin@zombieplus.com', password: 'pwd123' }
  cy.request({
    url: 'http://localhost:3333/sessions',
    method: 'POST',
    body: payload,
    failOnStatusCode: false
  }).then((response) => {
    return response
  })
})

Cypress.Commands.add('getCompanyId', (token, company) => {
  cy.request({
    url: 'http://localhost:3333/companies',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    },
    qs: {
      name: company
    },
    failOnStatusCode: false
  }).then((response) => {
    return response
  })
})
