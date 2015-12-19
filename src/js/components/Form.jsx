import React from 'react';

export default React.createClass({
  handleChange (action, e) {
    if (this.waiting) {
      clearTimeout(this.waiting);
    }
    this.waiting = setTimeout(() => {
      this.props[action](+e.target.value);
    }, 500);
  },

  delayAction (action) {
    return this.handleChange.bind(null, action);
  },

  render () {
    return (
      <div>
        <input
          type="text"
          placeholder="Enter homeprice"
          onChange={this.delayAction('setHomePrice')} />
      </div>
    );
  }
});
