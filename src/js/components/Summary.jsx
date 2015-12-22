import React from 'react';
import d3 from 'd3';
import '../../styles/Summary.scss';
import * as Constants from '../constants/MortgageConstants.js';

const currencyFormatter = (val) => d3.format('$,')(Math.round(val));
const percentFormatter = d3.format(',.0%');

export default React.createClass({
  getProduct (name) {
    console.log('data is', this.props.data);
    return this.props.data.filter (product => {
      return product.x === name;
    })[0];
  },

  amountDiff (newVal, origVal) {
    return newVal - origVal;
  },

  percentDiff (newVal, origVal) {
    var result = percentFormatter(newVal / origVal - 1);
    console.log('result is', result);
    return result;
  },

  renderFrontendDTIWarning () {
    const productsHighDTI = this.props.data.filter(product => {
      return product.frontendDTI >= .45;
    });
    const warnings = productsHighDTI.map(product => {
      return <p>
        {product.x} has a Frontend DTI > 45%.
      </p>
    });
    if (warnings.length > 0) {
      return <div className="warnings">{warnings}</div>;
    }
  },

  render () {
    // TODO: Decrease space between two paragraphs
    const productREX = this.getProduct(Constants.PRODUCT_REX.name);
    const product20 = this.getProduct(Constants.PRODUCT_20.name);
    const product035 = this.getProduct(Constants.PRODUCT_035.name);
    return (
      <div className="summary">
        <p className="explanation">Change the values in the form on your left. INSTRUCTIONS.</p>
        <p>
          With the REX Homebuyer, your downpayment would be <span className="underline">{ currencyFormatter(productREX.downPayment)}</span> with
          a monthly payment of <span className="underline">{currencyFormatter(productREX.y)}</span>. If you were to instead place a 20% downpayment,
          your downpayment would be <span className="underline">{currencyFormatter(this.amountDiff(product20.downPayment, productREX.downPayment))}</span> higher.
        </p>
        <p>
          If you instead choose to use the 3.5% Downpayment, your monthly payment would be <span className="underline">{currencyFormatter(product035.y)}</span>,
          or <span className="underline">{' ' + currencyFormatter(this.amountDiff(product035.y, productREX.y))}</span> more per month than with REX Homebuyer.
        </p>
        {this.renderFrontendDTIWarning()}
      </div>
    );
  }
});
