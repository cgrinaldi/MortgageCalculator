import React from 'react';
import d3 from 'd3';
import {connect} from 'react-redux';
import {calcDownpayment, calcMonthlyPITI, calcFrontendDTI} from '../calculations/piti';
import * as actionCreators from '../actions/mortgageActions';
import '../../styles/CalcPITI.scss';

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
    return (
      <div>
        <div className="row">
          <div id="user-input" className="col-md-3">
            <Form {...this.props} />
          </div>
          <div className="col-md-9 text-center">
            <Chart
              data={this.calculateMonthlyPITI()}
              title={"Monthly PITI"}
              yAxisLabel={"Monthly PITI"}
              labelFormatter={(val) => currencyFormat(Math.round(val))}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <Chart
              data={this.calculateDownpayments()}
              title={"Down Payment"}
              yAxisLabel={"Down Payment"}
              labelFormatter={(val) => currencyFormat(Math.round(val))}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <Chart
              data={this.calculateFrontendDTI()}
              title={"Front End DTI"}
              yAxisLabel={"Front End DTI"}
              labelFormatter={(val) => percentFormat(val)}
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
