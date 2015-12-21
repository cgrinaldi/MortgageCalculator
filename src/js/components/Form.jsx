import React from 'react';
import {Input} from 'react-bootstrap';
import '../../styles/Form.scss';

export default React.createClass({
  handleChange (action, e) {
    if (this.waiting) {
      clearTimeout(this.waiting);
    }
    this.waiting = setTimeout(() => {
      this.props[action](+e.target.value);
    }, 500);
  },

  delayAction (action) {
    return this.handleChange.bind(null, action);
  },

  render () {
    return (
      <div id="calc-inputs">
        <Input
          type="text"
          label="Home Price ($)"
          placeholder="Enter the price of the home"
          onChange={this.delayAction('setHomePrice')}
        />
        <Input
          type="text"
          label="Yearly Household Income ($)"
          placeholder="Enter your yearly household income"
          onChange={this.delayAction('setIncome')}
        />
        <Input
          type="text"
          label="Mortgage Interest Rate (%)"
          placeholder="Enter the mortgage's interest rate"
          onChange={this.delayAction('setInterestRate')}
        />
        <Input
          type="text"
          label="Property Tax Rate (%)"
          placeholder="Enter the property tax rate"
          onChange={this.delayAction('setPropertyTaxRate')}
        />
        <Input
          type="text"
          label="Property Insurance Rate (%)"
          placeholder="Enter the property insurance rate"
          onChange={this.delayAction('setPropertyInsuranceRate')}
        />
      </div>
    );
  }
});
