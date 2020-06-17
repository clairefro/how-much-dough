import React, { useState, useEffect } from 'react';

import {convert} from '../utils/convert'

const BreadBox = ({ referenceField, rates }) => {
  const [breads, setBreads] = useState(0)
  const [usd, setUsd] = useState(0)

  useEffect(()=> {
    if (referenceField.code !== 'USD') {
      const usdAmount = convert(referenceField.amount, referenceField.code, 'USD', rates)
      setUsd(usdAmount)
    } else {
      setUsd(referenceField.amount)
    }

  },[referenceField])

  useEffect(()=> {
    // 1 bread = 2.55 USD
    setBreads(usd/2.55)
  },[usd])

  return (
    <div className="bread-box">
    {breads > 0 &&
      <h3>That's {breads.toFixed(2)} loaves of bread in the USA.</h3>
    }
    <div className="breads">
    {'🍞'.repeat(breads)}

    </div>
    </div>
  );
}

export default BreadBox;
