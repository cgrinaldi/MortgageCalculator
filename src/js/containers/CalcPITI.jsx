import React from 'react';

import Chart from '../components/Chart';

// Temporary data to test the display and animation of the bar chart
var payments = [
  {x: '3.5% Down + MI', y: 3944},
  {x: '10% Down + MI', y: 3518},
  {x: '20% Down', y: 3037},
  {x: '10% Down + REX', y: 3037}
];

var newPayments = [
  {x: '3.5% Down + MI', y: 4500},
  {x: '10% Down + MI', y: 3750},
  {x: '20% Down', y: 3300},
  {x: '10% Down + REX', y: 3300}
];

export default React.createClass({
  updateData () {
    setTimeout(() => {
      console.log('changing!');
      payments = newPayments;
      // this.forceUpdate();
    }, 2000);
  },

  render () {
    this.updateData();
    return (
      <div>
        <Chart
          data={payments}
          title={"Monthly PITI"}
          yAxisLabel={"Monthly PITI"}
        />
      </div>
    );
  }
});
