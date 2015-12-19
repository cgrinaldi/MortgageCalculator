import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import configureStore from './store/configureStore';

import App from './containers/App';
import Intro from './containers/Intro';
import GettingStarted from './containers/GettingStarted';
import ApprovalTool from './containers/ApprovalTool';
import CalcPITI from './containers/CalcPITI';
import CalcMaxPurchase from './containers/CalcMaxPurchase';

const store = configureStore();
// Quick test to make sure the store is setup correctly
store.dispatch({type: 'SET_HOMEPRICE', val: 350000});

ReactDOM.render(
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
  </Router>,
  document.getElementById('app')
);
