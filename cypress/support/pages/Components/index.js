class Components {
  popupContainText(text) {
    cy.get('.swal2-popup.swal2-modal').should('be.visible').should('contain', text)
  }

  alertContain(text) {
    cy.get('span.alert').then(($el) => {
      if (typeof text === 'string') {
        // Se a validação é uma string
        expect($el.text()).to.contain(text)
      } else if (Array.isArray(text)) {
        // Se a validação é um array
        text.forEach((expectedMessage, index) => {
          expect($el.eq(index).text()).to.contain(expectedMessage)
        })
      } else {
        // Se a validação não é nem string nem array
        cy.log('Mensagem de validação não é uma string ou array. Verifique os dados de teste.')
      }
    })
  }

  rowsContains(text) {
    cy.get('.title').then(($el) => {
      if (typeof text === 'string') {
        // Se a validação é uma string
        expect($el.text()).to.contain(text)
      } else if (Array.isArray(text)) {
        // Se a validação é um array
        text.forEach((expectedMessage, index) => {
          expect($el.eq(index).text()).to.contain(expectedMessage)
        })
      } else {
        // Se a validação não é nem string nem array
        cy.log('Mensagem de validação não é uma string ou array. Verifique os dados de teste.')
      }
    })
  }
}

export default new Components()
