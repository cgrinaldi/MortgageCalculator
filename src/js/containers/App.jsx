import React from 'react';

const App = React.createClass({
  render () {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">FirstREX</a>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Introduction</a></li>
              <li><a href="#">Getting Started</a></li>
              <li><a href="#">Calculators</a></li>
              <li><a href="#">Approval Tool</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">User Settings</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

export default App;
