import React from 'react';

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

var payments = [
  {balance: 100000, baseline: 100000, overpayment: 0},
  {balance: 20000, baseline: 20000, overpayment: 0},
  {balance: 50000, baseline: 20000, overpayment: 0},
  {balance: 0, baseline: 0, overpayment: 0}
];

export const CalcPITI = React.createClass({
  render () {
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
