import React from 'react';
import '../../styles/App.scss';

import Chart from '../components/Chart';

export const Calculators = React.createClass({
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

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
  updateData () {
    setTimeout(() => {
      console.log('changing!');
      payments = newPayments;
      this.forceUpdate();
    }, 2000);
  },

  render () {
    this.updateData();
    return (
      <div>
        <Chart data={payments} />
      </div>
    );
  }
});

export const CalcMaxPurchase = React.createClass({
  render () {
    return (
      <h1>Max Purchase Calculator</h1>
    );
  }
});
