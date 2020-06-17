// returns targetAmount
export const convert = (baseAmount, baseCode, targetCode, rates) => {

  baseCode = baseCode.toUpperCase();
  targetCode = targetCode.toUpperCase();

  // get rate of baseCode, targetCode
  const baseRate = rates[baseCode]
  const targetRate = rates[targetCode]

  // divide baseAmount by rate of baseCode
  const francaAmount = baseAmount/baseRate

  // multiple result by rate of targetCode
  const result = francaAmount * targetRate

  // return targetAmount
  return result;
}
