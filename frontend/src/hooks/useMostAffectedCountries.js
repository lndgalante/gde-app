import { useState, useEffect } from 'react'

// Utils
import { db } from '../utils/firebase'

export const useMostAffectedCountries = (limit = 3) => {
  const [mostAffectedCountries, setMostAffectedCountries] = useState([])

  useEffect(() => {
    return db
      .collection('countries')
      .orderBy('confirmed', 'desc')
      .limit(limit)
      .onSnapshot((snapshot) => {
        const newData = snapshot.docChanges().map((change) => change.doc.data())
        setMostAffectedCountries(newData)
      })
  }, [limit])

  return mostAffectedCountries
}
