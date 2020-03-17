const express = require('express')
const dotenv = require('dotenv')

// Utils
const { getGlobalData } = require('./utils/api')
const { updateFirebaseCron } = require('./utils/cron')

// Setup dotenv
dotenv.config()

// Setup express
const app = express()

// Run cron
updateFirebaseCron()

app.get('/status', async (req, res) => {
  try {
    await getGlobalData()
    res.json({ status: 'UP' })
  } catch {
    res.json({ status: 'DOWN' })
  }
})

app.listen(3000)
