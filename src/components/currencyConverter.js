import React, { useState, useEffect } from 'react';

import { convert } from '../utils/convert'

const endpoint = 'https://openexchangerates.org/api/latest.json?app_id='
const apiId = '5eb4c18e936f4deeb6024f3d5dbab934'

const CurrencyConverter = ({ baseCur, targetCur }) => {
  const [rates, setRates] = useState({})
  const [input1, setInput1] = useState(0)
  const [input2, setInput2] = useState(0)

  // fetch rates from api, set to state and localstorage
  const fetchAndSetRates = () => {
    fetch(endpoint+apiId)
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('hmd-rates', JSON.stringify(data))
        setRates(data)
      })
      .catch(err => console.log(err))
    console.log('fetched new rates')
  }

  // returns true if cached timestamp date doesn not match today
  const isExpired = (timestamp) => {
    const now = new Date()
    const cached = new Date(timestamp * 1000)
    return now.getDate() !== cached.getDate()
  }

  useEffect(()=> {
    // set cached rates if timestamp valid
    if (localStorage.getItem('hmd-rates')) {
      const cachedRates = JSON.parse(localStorage.getItem('hmd-rates'))
      console.log('hmd-rates found in cache')
      if(isExpired(cachedRates.timestamp)) {
        fetchAndSetRates()
      } else {
        setRates(cachedRates)
      }
    } else {
      // otherwise fetch new rates and set state
      fetchAndSetRates()
    }
  },[])

  return (
    <div className="currency-converter">
      <input type="number" onFocus={e => console.log(e)} className="input-amount" value={input1} id="input-1"/>
      <input type="number" className="input-amount" value={input2} id="input-2"/>
    </div>
  )
}

export default CurrencyConverter;
