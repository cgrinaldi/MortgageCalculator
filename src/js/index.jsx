import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';

import App from './containers/App';
import Intro from './containers/Intro';
import GettingStarted from './containers/GettingStarted';
import ApprovalTool from './containers/ApprovalTool';
import {Calculators, CalcPITI, CalcMaxPurchase} from './containers/Calculators';

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="/intro" component={Intro} />
      <Route path="/start" component={GettingStarted} />
      <Route path="/calculators" component={Calculators}>
        <Route path="/calculators/piti" component={CalcPITI} />
        <Route path="/calculators/maxpurchase" component={CalcMaxPurchase} />
      </Route>
      <Route path="/approval" component={ApprovalTool} />
    </Route>
  </Router>,
  document.getElementById('app')
);
