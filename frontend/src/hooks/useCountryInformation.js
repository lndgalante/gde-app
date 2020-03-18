import { useState, useEffect } from 'react'

// Utils
import { db } from '../utils/firebase'

export const useCountryInformation = (country = '') => {
  const [countryInformation, setCountryInformation] = useState(null)

  useEffect(() => {
    return db
      .collection('countries')
      .where('countryRegion', '==', country)
      .onSnapshot((snapshot) => {
        const newData = snapshot.docChanges().map((change) => change.doc.data())[0]
        setCountryInformation(newData)
      })
  }, [country])

  return countryInformation
}
