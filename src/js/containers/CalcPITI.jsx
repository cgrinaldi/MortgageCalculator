import React from 'react';
import d3 from 'd3';
import {connect} from 'react-redux';
import {calcDownpayment, calcMonthlyPITI, calcFrontendDTI} from '../calculations/piti';
import * as actionCreators from '../actions/mortgageActions';
import '../../styles/CalcPITI.scss';

import {ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap';

import Chart from '../components/Chart';
import Form from '../components/Form';
import Summary from '../components/Summary';

const currencyFormat = d3.format('$,');
const percentFormat = d3.format(',%');

export const CalcPITI = React.createClass({

  getInitialState () {
    return {
      showing: 'summary'
    }
  },

  swapShowing (state) {
    this.setState({
      showing: state
    });
  },

  calculateData () {
    const {homePrice, rates, householdIncome, products} = this.props;
    const calcMonthlyPITIBound = calcMonthlyPITI.bind(null, homePrice, rates);
    const calcDownpaymentBound = calcDownpayment.bind(null, homePrice);
    const calcFrontendDTIBound = calcFrontendDTI.bind(null, homePrice, rates, householdIncome);
    return products.map((product) => {
      return {
        x: product.name,
        y: calcMonthlyPITIBound(product),
        frontendDTI: calcFrontendDTIBound(product),
        downPayment: calcDownpaymentBound(product)
      };
    });
  },

  renderView () {
    if (this.state.showing === 'summary') {
      return <Summary data={this.calculateData()} />
    } else {
      return (
        <Chart
          data={this.calculateData()}
          title={""}
          yAxisLabel={"Monthly PITI"}
          labelFormatter={(val) => currencyFormat(Math.round(val))}
        />
      );
    }
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
            <ButtonToolbar id="toggle-buttons">
              <ButtonGroup bsSize="large">
                <Button
                  className={this.state.showing === 'summary' ? 'selected' : ''}
                  style={buttonStyle}
                  onClick={() => this.swapShowing('summary')}>
                    Summary
                </Button>
                <Button
                  className={this.state.showing === 'visualization' ? 'selected' : ''}
                  style={buttonStyle}
                  onClick={() => this.swapShowing('visualization')}>
                    Chart
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
            {this.renderView()}
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
