import React from 'react';

export const Calculators = React.createClass({
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

export const CalcPITI = React.createClass({
  render () {
    return (
      <h1 >PITI and Cash Required Calculator</h1>
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
