import React from 'react';
import {connect} from 'react-redux';
import {calcDownpayment} from '../calculations/piti';

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

  calculateDownpayments () {
    const {homePrice, rates, householdIncome, products} = this.props;
    const calcDownpaymentBound = calcDownpayment.bind(null, homePrice);
    var downpayments = products.map((product) => {
      return {
        x: product.name,
        y: calcDownpaymentBound(product)
      };
    });
    return downpayments;
  },

  render () {
    return (
      <div>
        <Chart
          data={this.calculateDownpayments()}
          title={"Monthly PITI"}
          yAxisLabel={"Monthly PITI"}
        />
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
  mapStateToProps
)(CalcPITI);
