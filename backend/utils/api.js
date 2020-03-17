const Axios = require('axios').default

const baseURL = 'https://covid19.mathdro.id/api'
const axios = Axios.create({ baseURL })

const getGlobalData = () => axios.get('/')
const getAllStatesData = () => axios.get('/confirmed')

module.exports = { getGlobalData, getAllStatesData }
