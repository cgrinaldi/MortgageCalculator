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
  {x: 'a', y: 10},
  {x: 'b', y: 15},
  {x: 'c', y: 20},
  {x: 'd', y: 30}
];

var newPayments = [
  {x: 'a', y: 13},
  {x: 'b', y: 5},
  {x: 'c', y: 25},
  {x: 'd', y: 10}
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
        <h1>PITI and Cash Required Calculator</h1>
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
