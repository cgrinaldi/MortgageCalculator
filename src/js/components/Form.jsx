import React from 'react';
import d3 from 'd3'
import {Input} from 'react-bootstrap';
import '../../styles/Form.scss';

const currencyFormat = d3.format('$,');

export default React.createClass({
  handleChange (action, e) {
    const val = this.processInput(e.target.value);
    this.props[action](val);
  },

  processInput (str) {
    if (str[0] === '$') {
      var result = str.replace(/(\$|,)/g, '');
      return +result;
    }
  },

  render () {
    return (
      <div id="calc-inputs">
        <Input
          type="text"
          value={currencyFormat(this.props.homePrice)}
          label="Home Price ($)"
          placeholder="Enter the price of the home"
          onChange={this.handleChange.bind(null,'setHomePrice')}
        />
        <Input
          type="text"
          value={currencyFormat(this.props.householdIncome)}
          label="Yearly Household Income ($)"
          placeholder="Enter your yearly household income"
          onChange={this.handleChange.bind(null,'setIncome')}
        />
        <Input
          type="text"
          value={this.props.rates.mortgageInterestRate}
          label="Mortgage Interest Rate (%)"
          placeholder="Enter the mortgage's interest rate"
          onChange={this.handleChange.bind(null,'setInterestRate')}
        />
        <Input
          type="text"
          value={this.props.rates.propertyTaxRate}
          label="Property Tax Rate (%)"
          placeholder="Enter the property tax rate"
          onChange={this.handleChange.bind(null,'setPropertyTaxRate')}
        />
        <Input
          type="text"
          value={this.props.rates.propertyInsuranceRate}
          label="Property Insurance Rate (%)"
          placeholder="Enter the property insurance rate"
          onChange={this.handleChange.bind(null,'setPropertyInsuranceRate')}
        />
      </div>
    );
  }
});
