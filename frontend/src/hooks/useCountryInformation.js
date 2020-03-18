import { useState, useEffect } from 'react'

// Utils
import { db } from '../utils/firebase'

export const useCountryInformation = (country = '') => {
  const [countryInformation, setCountryInformation] = useState(null)

  useEffect(() => {
    const getCountryInformation = () => {
      const unsuscribe = db
        .collection('countries')
        .where('countryRegion', '==', country)
        .onSnapshot((snapshot) => {
          const newData = snapshot.docChanges().map((change) => change.doc.data())[0]
          setCountryInformation(newData)
        })

      return unsuscribe
    }

    const unsuscribe = getCountryInformation()

    return () => unsuscribe()
  }, [country])

  return { countryInformation }
}
