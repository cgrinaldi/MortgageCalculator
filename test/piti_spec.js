import {expect} from 'chai';

import {calcDownpayment, calcLoanAmt,
        calcMonthlyMortgagePayment,
        calcMonthlyPITI, calcFrontendDTI} from  '../src/js/calculations/piti.js';

import {MI_PREM_035, MI_PREM_10, PRODUCT_035, PRODUCT_10,
        PRODUCT_20, PRODUCT_REX} from './MortgageConstants.js';

describe('PITI and Cash Required', () => {
  const fractionDownpayment = 0.1;
  const homePrice = 500000;
  const rates = {
    propertyTaxRate: 0.0125,
    propertyInsuranceRate: 0.003,
    mortgageInterestRate: 0.04
  };
  const yearlyIncome = 70000;

  describe('calcDownpayment()', () => {

    it('should calculate the downpayment correctly for the 3.5% Down Plus Insurance product', () => {
      expect(calcDownpayment(homePrice, PRODUCT_035)).to.equal(17500);
    });

    it('should calculate the correct downpayment for the 10% Down Plus Insurance product', () => {
      expect(calcDownpayment(homePrice, PRODUCT_10)).to.equal(50000);
    });

    it('should calculate the correct downpayment for the 20% Down product', () => {
      expect(calcDownpayment(homePrice, PRODUCT_20)).to.equal(100000);
    });

    it ('should have the downpayment correctly calculated for the REX product', () => {
      expect(calcDownpayment(homePrice, PRODUCT_REX)).to.equal(50000);
    });
  });

  describe('calcLoanAmt()', () => {
    it ('should calculate the correct loan amt correctly for the REX product', () => {
      expect(calcLoanAmt(homePrice, PRODUCT_REX))
        .to.equal(400000);
    });
  });

  describe('calcMonthlyMortgagePayment()', () => {
    it ('should calculate the correct monthly mortgage payment', () => {
      const interestRate = 0.04;
      const loanAmt = 482500;
      expect(+calcMonthlyMortgagePayment(loanAmt, interestRate).toFixed(2)).to.equal(2303.53);
    });
  });

  describe('calcMonthlyPITI()', () => {

    var calcMonthlyPITIbound = calcMonthlyPITI.bind(null, homePrice, rates);

    it('should calculate the correct PITI for the 3.5% Down Plus Insurance product', () => {
      const monthlyPITI = calcMonthlyPITIbound(PRODUCT_035);
      expect(+monthlyPITI.toFixed(2)).to.equal(3286.76);
    });

    it('should calculate the correct PITI for the 10% Down Plus Insurance product', () => {
      const monthlyPITI = calcMonthlyPITIbound(PRODUCT_10);
      expect(+monthlyPITI.toFixed(2)).to.equal(2931.70);
    });

    it('should calculate the correct PITI for the 20% Down product', () => {
      const monthlyPITI = calcMonthlyPITIbound(PRODUCT_20);
      expect(+monthlyPITI.toFixed(2)).to.equal(2530.49)
    });

    it('should calculate the correct PITI for the REX product', () => {
      const monthlyPITI = calcMonthlyPITIbound(PRODUCT_REX);
      expect(+monthlyPITI.toFixed(2)).to.equal(2530.49);
    });

  });

  describe('calcFrontendDTI()', () => {

    const calcFrontendDTIbound = calcFrontendDTI.bind(null, homePrice, rates, yearlyIncome);

    it('should calculate the correct frontend DTI for the 3.5% Down Plus Insurance product', () => {
      const frontendDTI = calcFrontendDTIbound(PRODUCT_035);
      expect(+frontendDTI.toFixed(3)).to.equal(0.563);
    });

    it('should calculate the correct frontend DTI for the 10% Down Plus Insurance product', () => {
      const frontendDTI = calcFrontendDTIbound(PRODUCT_10);
      expect(+frontendDTI.toFixed(3)).to.equal(0.503);
    });

    it('should calculate the correct frontend DTI for the 20% Down product', () => {
      const frontendDTI = calcFrontendDTIbound(PRODUCT_20);
      expect(+frontendDTI.toFixed(3)).to.equal(0.434);
    });

    it('should calculate the correct frontend DTI for the REX product', () => {
      const frontendDTI = calcFrontendDTIbound(PRODUCT_REX);
      expect(+frontendDTI.toFixed(3)).to.equal(0.434);
    });

  });

});
