import React from 'react';
import d3 from 'd3'
import {Input} from 'react-bootstrap';
import '../../styles/Form.scss';

const currencyFormat = d3.format('$,');
const percentFormat = d3.format(',.2%');

export default React.createClass({
  getInitialState () {
    const {homePrice, householdIncome} = this.props;
    const {mortgageInterestRate, propertyInsuranceRate, propertyTaxRate} = this.props.rates;
    return {
      homePrice,
      householdIncome,
      mortgageInterestRate: this.round(100 * mortgageInterestRate,4),
      propertyInsuranceRate: this.round(100 * propertyInsuranceRate,4),
      propertyTaxRate: this.round(100 * propertyTaxRate,4)
    };
  },

  round (number, decimalPlaces) {
    return Math.round(Math.pow(10, decimalPlaces) * number) / Math.pow(10, decimalPlaces);
  },

  componentWillReceiveProps (newProps) {
    const {homePrice, householdIncome,
           rates: {mortgageInterestRate, propertyInsuranceRate, propertyTaxRate}} = newProps;
    this.setState({
      homePrice,
      householdIncome,
      mortgageInterestRate: this.round(100 * mortgageInterestRate, 4),
      propertyInsuranceRate: this.round(100 * propertyInsuranceRate, 4),
      propertyTaxRate: this.round(100 * propertyTaxRate,4)
    });
  },

  handleCurrencyChange (action, property, e) {
    const userInput = e.target.value;
    const cleanedInput = parseInt(userInput.replace(/(\$|,)/g, ''));
    // If input is a valid integer, create and dispatch change action
    if (cleanedInput) {
      this.props[action](cleanedInput);
    } else {
      // Still need to update the state so the user can see their input
      // TODO: Could show the user an error
      this.setState({
        [prop]: cleanedInput
      })
    }
  },

  // TODO: This needs to be cleaned up, better documented, and possibly placeholder
  // in a helper module (or a component created)
  // NOTE: We use `onKeyDown` because it gives us more control over what the user is doing.
  // This is necessary especially in the case of backspace. Before, if we were using
  // onChange, we would just get the number back with '%' removed. We need to change
  // the number based on if it is being deleted or added, which onKeyDown lets us do.
  handlePercentChange (action, property, e) {
    var enteredChar;
    const userInput = e.target.value;
    const enteredCharCode = e.keyCode;

    // If the entered character is not a number, '.', or backspace
    if (!((enteredCharCode >= '0'.charCodeAt(0) && enteredCharCode <= '9'.charCodeAt(0))
        || enteredCharCode === 190 || enteredCharCode === 8)) {
          return;
        }
    // For some reason the character code is not resulting in a period
    // TODO: Verify that character codes are constant across browsers
    if (enteredCharCode === 190) {
      enteredChar = '.';
    } else {
      enteredChar = String.fromCharCode(enteredCharCode);
    }

    var cleanedInput;
    // If user hits the backspace key...
    if (enteredCharCode === 8) {
      // First remove the % sign
      cleanedInput = userInput.slice(0,-1);
      // If the length is 1, then set to 0 (user intended to remove first char)
      if (cleanedInput.length === 1) {
        cleanedInput = '0';
      } else {
        cleanedInput = cleanedInput.slice(0, -1);
      }
    }
    // Otherwise, handle the addition of a character
    else {
      // If current entry is 0%
      if (userInput.length === 2 && userInput[0] === '0') {
        if (enteredChar === '.') cleanedInput = '0.';
        else cleanedInput = enteredChar
      } else {
        cleanedInput = userInput.slice(0, -1) + enteredChar;
      }
    }

    // We do not want to parse or send this to Redux, user still typing
    if (cleanedInput.endsWith('.') ||
       (cleanedInput.endsWith('0') && (cleanedInput.indexOf('.') !== -1 && cleanedInput.indexOf('0') < cleanedInput.indexOf('.')))) {
      this.setState({
        [property]: cleanedInput
      });
      return;
    }

    const floatCleanedInput = parseFloat(cleanedInput);
    // This gets the case of 0.0 (the user is still writing, we don't watnt to convert to 0)
    if (floatCleanedInput === 0) {
      this.setState({
        [property]: cleanedInput
      });
    } else if (floatCleanedInput) {
      this.props[action](cleanedInput / 100);
    } else {
      this.setState({
        [property]: cleanedInput
      });
    }
  },

  render () {
    console.log('state is', this.state);
    return (
      <div id="calc-inputs">
        <Input
          type="text"
          value={currencyFormat(this.state.homePrice)}
          label="Home Price ($)"
          placeholder="Enter the price of the home"
          onChange={this.handleCurrencyChange.bind(null,'setHomePrice', 'homePrice')}
        />
        <Input
          type="text"
          value={currencyFormat(this.state.householdIncome)}
          label="Yearly Household Income ($)"
          placeholder="Enter your yearly household income"
          onChange={this.handleCurrencyChange.bind(null,'setIncome', 'householdIncome')}
        />
        <Input
          type="text"
          value={this.state.mortgageInterestRate + '%'}
          label="Mortgage Interest Rate (%)"
          placeholder="Enter the mortgage's interest rate"
          onKeyDown={this.handlePercentChange.bind(null,'setInterestRate', 'mortgageInterestRate')}
        />
        <Input
          type="text"
          value={this.state.propertyTaxRate + '%'}
          label="Property Tax Rate (%)"
          placeholder="Enter the property tax rate"
          onKeyDown={this.handlePercentChange.bind(null,'setPropertyTaxRate', 'propertyTaxRate')}
        />
        <Input
          type="text"
          value={this.state.propertyInsuranceRate + '%'}
          label="Property Insurance Rate (%)"
          placeholder="Enter the property insurance rate"
          onKeyDown={this.handlePercentChange.bind(null,'setPropertyInsuranceRate', 'propertyInsuranceRate')}
        />
      </div>
    );
  }
});
