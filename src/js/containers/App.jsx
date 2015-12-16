import React from 'react';

import Navigation from '../components/Navigation';
import Intro from './Intro';

const App = React.createClass({
  render () {
    return (
      <div>
        <Navigation />
        <div className="container">
          {this.content()}
        </div>
      </div>
    );
  },

  // This logic allows us to have a default component (GettingStarted)
  content () {
    if (this.props.children) {
      return this.props.children;
    } else {
      return <Intro />
    }
  }
});

export default App;
