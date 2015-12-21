import React from 'react';
import d3 from 'd3';
import {connect} from 'react-redux';
import {calcDownpayment, calcMonthlyPITI, calcFrontendDTI} from '../calculations/piti';
import * as actionCreators from '../actions/mortgageActions';
import '../../styles/CalcPITI.scss';

import {ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap';

import Chart from '../components/Chart';
import Form from '../components/Form';

const currencyFormat = d3.format('$,');
const percentFormat = d3.format(',%');

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

  render () {
    const buttonStyle = {
      borderRadius: '0px',
      fontFamily: 'Lato',
      textTransform: 'uppercase'
    };
    return (
      <div>
        <h3>PITI and Cash Required</h3>
        <hr />
        <div className="row">
          <div id="user-input" className="col-md-3">
            <Form {...this.props} />
          </div>
          <div className="col-md-9 text-center">
            <ButtonToolbar style={{paddingLeft: '40%'}}>
              <ButtonGroup bsSize="large">
                <Button style={buttonStyle}>Madlib</Button>
                <Button style={buttonStyle}>Chart</Button>
              </ButtonGroup>
            </ButtonToolbar>
            <Chart
              data={this.calculateMonthlyPITI()}
              title={""}
              yAxisLabel={"Monthly PITI"}
              labelFormatter={(val) => currencyFormat(Math.round(val))}
            />
          </div>
        </div>
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
