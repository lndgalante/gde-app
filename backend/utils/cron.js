const nanoid = require('nanoid')
const cron = require('node-cron')

// Utils
const { getGlobalData, getAllStatesData } = require('./api')

const getCoronaVirusData = async () => {
  const [globalData, allStatesData] = (await Promise.all([getGlobalData(), getAllStatesData()])).map(({ data }) => data)

  // Global data parsing
  const {
    confirmed: { value: totalConfirmed },
    recovered: { value: totalRecovered },
    deaths: { value: totalDeaths },
  } = globalData

  // All states data parsing
  const allStatesWithIds = allStatesData.map((stateData) => ({ ...stateData, id: nanoid(8) }))
  const countryCases = allStatesWithIds.reduce(
    (acc, state) => ({ ...acc, [state.countryRegion]: [...(acc[state.countryRegion] || []), state] }),
    {},
  )
  const countryNames = Object.keys(countryCases)

  return { totalConfirmed, totalRecovered, totalDeaths, countryCases, countryNames }
}

const updateFirebaseCron = async () => {
  const { totalConfirmed, totalRecovered, totalDeaths, countryCases, countryNames } = await getCoronaVirusData()
  console.log('updateFirebaseCron -> totalConfirmed', totalConfirmed)

  cron.schedule('5 * * * *', async () => {
    const { totalConfirmed, totalRecovered, totalDeaths, countryCases, countryNames } = await getCoronaVirusData()
    console.log('updateFirebaseCron -> totalConfirmed', totalConfirmed)
  })
}

module.exports = { updateFirebaseCron }
