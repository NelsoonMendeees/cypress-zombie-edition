import './commands'
import '@mmisty/cypress-allure-adapter/support'
require('dotenv').config()

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
