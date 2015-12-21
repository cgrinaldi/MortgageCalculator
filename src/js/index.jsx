import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

import App from './containers/App';
import Intro from './containers/Intro';
import GettingStarted from './containers/GettingStarted';
import ApprovalTool from './containers/ApprovalTool';
import CalcPITI from './containers/CalcPITI';
import CalcMaxPurchase from './containers/CalcMaxPurchase';

import '../styles/App.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App}>
        <Route path="/intro" component={Intro} />
        <Route path="/start" component={GettingStarted} />
        <Route path="/calculators">
          <Route path="/calculators/piti" component={CalcPITI} />
          <Route path="/calculators/maxpurchase" component={CalcMaxPurchase} />
        </Route>
        <Route path="/approval" component={ApprovalTool} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
