export function calcDownpayment (homePrice, product) {
  return homePrice * product.downpaymentFraction;
}

export function calcLoanAmt (homePrice, product) {
  const downpayment = calcDownpayment(homePrice, product);
  const REXdownpayment = product.isREX ? downpayment : 0;
  return homePrice - downpayment - REXdownpayment;
}

export function calcMonthlyMortgagePayment (loanAmt, interestRate) {
  // http://www.mtgprofessor.com/formulas.htm
  const numMonths = 30 * 12;
  const monthlyRate = interestRate / 12;
  return loanAmt * (monthlyRate * Math.pow(1 + monthlyRate, numMonths)) /
                   (Math.pow(1 + monthlyRate, numMonths) - 1);
}

export function calcMonthlyMIPrem (yearlyMIRate, loanAmt) {
  if (yearlyMIRate === 0) {
    return 0;
  }
  return loanAmt * yearlyMIRate / 12;
}

export function calcMonthlyPropTaxes (yearlyPropTaxRate, homeValue) {
  return homeValue * yearlyPropTaxRate / 12;
}

export function calcMonthlyPropInsurance (yearlyPropInsuranceRate, loanAmt) {
  return loanAmt * yearlyPropInsuranceRate / 12;
}

export function calcMonthlyPITI (homePrice, rates, product) {
  const downpayment = calcDownpayment(homePrice, product);
  const loanAmt = calcLoanAmt(homePrice, product);
  const monthlyMortgage = calcMonthlyMortgagePayment(loanAmt, rates.mortgageInterestRate);
  const monthlyMIPrem = calcMonthlyMIPrem(product.MIPrem, loanAmt);
  const monthlyPropTaxes = calcMonthlyPropTaxes(rates.propertyTaxRate, homePrice);
  const monthlyPropInsurance = calcMonthlyPropInsurance(rates.propertyInsuranceRate, loanAmt);
  return monthlyMortgage + monthlyMIPrem + monthlyPropTaxes + monthlyPropInsurance;
}

export function calcFrontendDTI(homePrice, rates, yearlyIncome, product) {
  const monthlyPITI = calcMonthlyPITI(homePrice, rates, product);
  return 12 * monthlyPITI / yearlyIncome;
}
