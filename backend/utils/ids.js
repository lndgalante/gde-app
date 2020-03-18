const hasha = require('hasha')

const createUniqueId = (string) => hasha(string).slice(0, 6)

module.exports = { createUniqueId }
