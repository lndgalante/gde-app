require('dotenv').config()
const express = require('express')

// Utils
const { getGlobalData } = require('./utils/api')
const { coronaVirusCron } = require('./utils/cron')

// Setup express
const app = express()
const PORT = process.env.PORT || 3000

// Run cron
coronaVirusCron()

// Endpoints
app.get('/status', (_req, res) => {
  getGlobalData()
    .then(() => res.json({ status: 'UP' }))
    .catch(() => res.json({ status: 'DOWN' }))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
