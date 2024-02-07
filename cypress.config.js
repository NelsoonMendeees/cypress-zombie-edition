require('dotenv').config()

const { defineConfig } = require('cypress')
const { configureAllureAdapterPlugins } = require('@mmisty/cypress-allure-adapter/plugins')
const { Client } = require('pg')

const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      configureAllureAdapterPlugins(on, config)
      on('task', {
        async connectDB(query) {
          const client = new Client(dbConfig)
          await client.connect()
          const res = await client.query(query)
          await client.end()
          return res.rows
        }
      })
      return config
    },
    baseUrl: 'http://localhost:3000',
    watchForFileChanges: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    scrollBehavior: false,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    experimentalRunAllSpecs: true
  },
  DB: {},
  env: {
    allureAttachRequests: true
  }
})
