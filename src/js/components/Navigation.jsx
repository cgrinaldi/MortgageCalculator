import React from 'react';
import {Link} from 'react-router';
import '../../styles/Navigation.scss';

export default React.createClass({
  render () {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><img src="http://s18.postimg.org/ybyihby7t/First_Rex_logo2.png" /></a>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link activeClassName="active" to="intro">Introduction</Link></li>
              <li><Link activeClassName="active" to="start">Getting Started</Link></li>

                <li className="dropdown">
                  <a href="#" data-toggle="dropdown" className="dropdown-toggle">Calculators <b className="caret"></b></a>
                    <ul className="dropdown-menu">
                      <li><Link to="calculators/piti">PITI and Cash Required</Link></li>
                      <li><Link to="calculators/maxpurchase">Maximum Purchase Power</Link></li>
                    </ul>
                </li>

              <li><Link activeClassName="active" to="approval">Approval Tool</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a id="user-icon"><i className="fa fa-user"></i></a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});
