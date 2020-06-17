import React, { useState, useEffect } from 'react';

import { convert } from '../utils/convert'

const endpoint = 'https://openexchangerates.org/api/latest.json?app_id='
const apiId = '5eb4c18e936f4deeb6024f3d5dbab934'

const CurrencyConverter = ({ baseCur, targetCur }) => {
  const [rates, setRates] = useState({})

  useEffect(()=> {
    // fetch(endpoint+apiId)
    //   .then(res=> res.json())
    //   .then(data=> {
    //     console.log(data)
    //     setRates(data)
    //     localStorage.setItem('rate-timestamp', data.timestamp);
    //   })
    // fetch api data, set to local storage
    // fetch(endpoint+apiId)
    //   .then(res=> {
    //     localStorage.setItem('curr-rates', console.log(res));
    //   })
    //   .catch(err => console.log(err))
    console.log('sdfkjh')
  },[])
  return (
    <div className="currency-converter">
      <CurrencyConverter />
    </div>
  )
}

export default CurrencyConverter;
