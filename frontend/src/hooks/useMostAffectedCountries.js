import { useState, useEffect } from 'react'

// Utils
import { db } from '../utils/firebase'

export const useMostAffectedCountries = (limit = 3) => {
  const [mostAffectedCountries, setMostAffectedCountries] = useState([])

  useEffect(() => {
    const getMostAffectedCountries = () => {
      const unsuscribe = db
        .collection('countries')
        .orderBy('confirmed', 'desc')
        .limit(limit)
        .onSnapshot((snapshot) => {
          const newData = snapshot.docChanges().map((change) => change.doc.data())
          setMostAffectedCountries(newData)
        })

      return unsuscribe
    }

    const unsuscribe = getMostAffectedCountries()
    return () => unsuscribe()
  }, [limit])

  return { mostAffectedCountries }
}
