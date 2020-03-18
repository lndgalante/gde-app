const cron = require('node-cron')

// Utils
const { db } = require('./firebase')
const { createUniqueId } = require('./ids')
const { getGlobalData, getAllStatesData } = require('./api')

const getCoronaVirusData = async () => {
  const [globalData, allStatesData] = (await Promise.all([getGlobalData(), getAllStatesData()])).map(({ data }) => data)

  // Global data parsing
  const {
    lastUpdate,
    deaths: { value: totalDeaths },
    confirmed: { value: totalConfirmed },
    recovered: { value: totalRecovered },
  } = globalData

  const global = [
    { key: 'lastUpdate', value: lastUpdate },
    { key: 'totalDeaths', value: totalDeaths },
    { key: 'totalConfirmed', value: totalConfirmed },
    { key: 'totalRecovered', value: totalRecovered },
  ]

  // All states data parsing
  const countries = allStatesData.reduce((acc, state) => {
    const prevState = acc[state.countryRegion] || { confirmed: 0, recovered: 0, deaths: 0 }

    const id = createUniqueId(state.countryRegion)

    const newState = {
      ...prevState,
      id,
      lat: state.lat,
      lon: state.long,
      countryRegion: state.countryRegion,
      deaths: prevState.deaths + state.deaths,
      confirmed: prevState.confirmed + state.confirmed,
      recovered: prevState.recovered + state.recovered,
    }

    return { ...acc, [state.countryRegion]: newState }
  }, {})

  return { global, countries }
}

const saveCoronaVirusDataToFirestore = async () => {
  const { global, countries } = await getCoronaVirusData()

  // Get collections
  const globalCollection = db.collection('global')
  const countriesCollection = db.collection('countries')

  // Save global data to global collection
  global.forEach(({ key, value }) => globalCollection.doc(key).update({ value }))

  // Save each country to countries collection
  for (const key in countries) {
    const country = countries[key]
    countriesCollection.doc(country.id).set(country)
  }
}

const coronaVirusCron = () => {
  saveCoronaVirusDataToFirestore()
  cron.schedule('*/2 * * * *', saveCoronaVirusDataToFirestore)
}

module.exports = { coronaVirusCron }
