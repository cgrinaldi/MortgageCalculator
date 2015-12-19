import React from 'react';
import {connect} from 'react-redux';
import {calcDownpayment, calcMonthlyPITI, calcFrontendDTI} from '../calculations/piti';
import * as actionCreators from '../actions/mortgageActions';

import Chart from '../components/Chart';

// Temporary data to test the display and animation of the bar chart
var payments = [
  {x: '3.5% Down + MI', y: 3944},
  {x: '10% Down + MI', y: 3518},
  {x: '20% Down', y: 3037},
  {x: '10% Down + REX', y: 3037}
];

var newPayments = [
  {x: '3.5% Down + MI', y: 4500},
  {x: '10% Down + MI', y: 3750},
  {x: '20% Down', y: 3300},
  {x: '10% Down + REX', y: 3300}
];

export const CalcPITI = React.createClass({

  calculateMonthlyPITI () {
    const {homePrice, rates, products} = this.props;
    const calcMonthlyPITIBound = calcMonthlyPITI.bind(null, homePrice, rates);
    var productsMonthlyPITI = products.map((product) => {
      return {
        x: product.name,
        y: calcMonthlyPITIBound(product)
      };
    });
    return productsMonthlyPITI;
  },

  calculateDownpayments () {
    const {homePrice, products} = this.props;
    const calcDownpaymentBound = calcDownpayment.bind(null, homePrice);
    var downpayments = products.map((product) => {
      return {
        x: product.name,
        y: calcDownpaymentBound(product)
      };
    });
    return downpayments;
  },

  calculateFrontendDTI () {
    const {homePrice, rates, householdIncome, products} = this.props;
    const calcFrontendDTIBound = calcFrontendDTI.bind(null, homePrice, rates, householdIncome);
    var productsFrontendDTIs = products.map((product) => {
      return {
        x: product.name,
        y: calcFrontendDTIBound(product)
      };
    });
    return productsFrontendDTIs;
  },

  handleChange (e) {
    if (this.waiting) {
      clearTimeout(this.waiting);
    }
    this.waiting = setTimeout(() => {
      this.props.setHomePrice(+e.target.value);
    }, 500);
  },

  render () {
    return (
      <div>
        <Chart
          data={this.calculateMonthlyPITI()}
          title={"Monthly PITI"}
          yAxisLabel={"Monthly PITI"}
        />
        <Chart
          data={this.calculateDownpayments()}
          title={"Down Payment"}
          yAxisLabel={"Down Payment"}
        />
        <Chart
          data={this.calculateFrontendDTI()}
          title={"Front End DTI"}
          yAxisLabel={"Front End DTI"}
        />
      <input type="text" placeholder="Enter homeprice" onChange={this.handleChange} />
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    ...state.pitiCalculator
  };
}

export default connect(
  mapStateToProps,
  actionCreators
)(CalcPITI);
