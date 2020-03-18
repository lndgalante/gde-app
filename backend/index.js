require('dotenv').config()
const cors = require('cors')
const helmet = require('helmet')
const app = require('express')()

// Utils
const { getGlobalData } = require('./utils/api')
const { coronaVirusCron } = require('./utils/cron')

// Setup express
app.use(cors())
app.use(helmet())

// Run cron
coronaVirusCron()

// Constants
const PORT = process.env.PORT || 3000

// Endpoints
app.get('/status', (_req, res) => {
  getGlobalData()
    .then(() => res.json({ status: 'UP' }))
    .catch(() => res.json({ status: 'DOWN' }))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
