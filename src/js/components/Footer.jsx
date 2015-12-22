import React from 'react';
import {Link} from 'react-router';
import '../../styles/Footer.scss';

export default React.createClass({
  render () {
    return (
      <footer className="footer">
        <div className="col-md-12 text-center">
          <ul>
            <li>Prototype by Chris Rinaldi</li>
            <li><a href="https://www.linkedin.com/in/cgrinaldi"><i className="fa fa-linkedin-square"></i></a></li>
            <li><a href="https://github.com/cgrinaldi"><i className="fa fa-github"></i></a></li>
            <li><a href="https://twitter.com/cgrinaldi"><i className="fa fa-twitter"></i></a></li>
            <li><a href="mailto:cgrinaldi@gmail.com"><i className="fa fa-envelope"></i></a></li>
            <li><a href="http://cgrinaldi.github.io/"><i className="fa fa-rss"></i></a></li>
          </ul>
        </div>
      </footer>
    );
  }
});
