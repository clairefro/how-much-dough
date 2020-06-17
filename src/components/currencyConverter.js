import React, { useState, useEffect, useRef } from 'react';
import SVG from 'react-inlinesvg'

import { convert } from '../utils/convert'

import BreadBox from './breadBox'
import breadOutline from '../static/bread-outline.svg'

const endpoint = 'https://openexchangerates.org/api/latest.json?app_id='
const apiId = '5eb4c18e936f4deeb6024f3d5dbab934'


const CurrencyConverter = ({ baseCur, targetCur }) => {
  const [rates, setRates] = useState({})
  const [codes, setCodes] = useState([])
  const [field1, setField1] = useState({ amount: 0, code: 'USD' })
  const [field2, setField2] = useState({ amount: 0, code: 'JPY' })
  const [baseField, setBaseField] = useState(1)
  // const [baseRate, setBaseRate] = useState(1)
  // const [adjTargetRate, setAdjTargetRate] = useState(1)

  const field1Input = useRef()
  const field2Input = useRef()
  const field1Code = useRef()
  const field2Code = useRef()

  const onChange = (fieldNum) => {
    if(fieldNum===1) {
      const amount = field1Input.current.value
      const code = field1Code.current.value
      setField1({
        amount: amount,
        code: code
      })
      // setBaseField(1)
      }
    else {
      const amount = field2Input.current.value
      const code = field2Code.current.value
      setField2({
          amount: amount,
          code: code
        })
      // setBaseField(2)
      }
    }

  useEffect(()=> {
    // calc conversion and display in field 2
    if(baseField === 1){
      if(Object.keys(rates).length>0) {
        console.log(rates)
        const targetAmount = convert(field1.amount, field1.code, field2.code, rates.rates)
        setField2(prevState=> ({ ...prevState, amount: targetAmount}))
      }
    }
  },[field1])

  useEffect(()=> {
    // calc conversion and display in field 2
    if(baseField === 2){
      if(Object.keys(rates).length>0) {
        console.log(rates)
        const targetAmount = convert(field2.amount, field2.code, field1.code, rates.rates)
        setField1(prevState=> ({ ...prevState, amount: targetAmount}))
      }
    }
  },[field2])

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

  useEffect(() => {
    const rateObj = rates.rates
    rateObj ? setCodes(Object.keys(rateObj)) : setCodes([])
  }, [rates])

  return (
    <div className="currency-converter">
      <div className="top">
        <SVG className="bread-outline" src={breadOutline} />
        <div className="input-section">
          <input
            ref={field1Input}
            type="number"
            onChange={()=>onChange(1)}
            onFocus={()=> baseField === 1 ? null : setBaseField(1)}
            className="input-amount"
            value={field1.amount}
            id="input-1"/>
          <select
            ref={field1Code}
            name="code1"
            onChange={()=>onChange(1)}
            onFocus={()=> baseField === 1 ? null : setBaseField(1)}
            value={field1.code}
            id="code1"
          >
            {codes.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="input-section">
          <input
            ref={field2Input}
            type="number"
            onFocus={()=> baseField === 2 ? null : setBaseField(2)}
            onChange={()=>onChange(2)}
            className="input-amount"
            value={field2.amount}
            id="input-2"/>
          <select
            ref={field2Code}
            name="code2"
            onFocus={()=> baseField === 2 ? null : setBaseField(2)}
            onChange={()=>onChange(2)}
            value={field2.code}
            id="code2">
            {codes.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="bottom">
        <BreadBox referenceField={field1} rates={rates.rates} />
      </div>
    </div>
  )
}

export default CurrencyConverter;
