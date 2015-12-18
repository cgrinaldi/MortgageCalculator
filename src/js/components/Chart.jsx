import React from 'react';
import d3 from 'd3';
import '../../styles/Chart.scss';

// TODO: Implement Redux and form controls to update the chart

const margin = {top: 65, right: 20, bottom: 30, left: 100},
	fullWidth = 600,
	fullHeight = 350,
	width = fullWidth - margin.left - margin.right,
	height = fullHeight - margin.top - margin.bottom;

const ANIM_BAR_SPEED = 1500;
const ANIM_AXIS_SPEED = 800;

const x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1)
    .domain(['3.5% Down + MI','10% Down + MI','20% Down','10% Down + REX']);

const y = d3.scale.linear()
			.range([height, 0])
      .domain([0, 4000]); // TOOD: Need to not hard code this

const currencyFormat = d3.format("$,");

const xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

const yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
      .tickFormat(currencyFormat);



export default React.createClass({

  render () {
    return (
      <svg ref="chart"></svg>
    );
  },

	shouldComponentUpdate({data}){
		y.domain([0,d3.max(data, d => d.y)]);

		var svg=d3.select(this.refs.chart)
			.select("g");

    var bars = svg.selectAll('.bar')
      .data(data);

    bars
      .transition()
      .duration(ANIM_BAR_SPEED)
      .ease('back-out')
        .attr('x', d => x(d.x))
        .attr('width', x.rangeBand())
        .attr('y', d => y(d.y))
        .attr('height', d => height - y(d.y));

    var labels = svg.selectAll('.text-label')
        .data(data);

    labels
      .transition()
      .duration(ANIM_BAR_SPEED)
      .ease('back-out')
        .text(d => currencyFormat(d.y))
        .attr('x', d => x(d.x) + x.rangeBand()/2)
        .attr('y', d => y(d.y) - 5)

    // This shouldn't be updating with the calculator
		svg.select(".x.axis")
      .transition()
			.duration(ANIM_AXIS_SPEED)
			.call(xAxis);

		svg.select(".y.axis")
      .transition()
			.duration(ANIM_AXIS_SPEED)
			.call(yAxis);

		return false;
	},

	componentDidMount() {
    // The 'g' element we are adding below is the grouping for the entire chart
		d3.select(this.refs.chart)
      .attr("width", fullWidth)
      .attr("height", fullHeight)
			.attr('preserveAspectRatio','xMidYMid')
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		var {data} = this.props;

		var svg = d3.select(this.refs.chart).select("g");

    // The 'g' element we are adding is for the xAxis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", `translate(0,${height+5})`)
			.call(xAxis);

		svg.append("g")
		    .attr("class", "y axis")
			  .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -75)
        .attr("x", -90)
        .attr("dy", ".71em")
        .style("text-anchor","end")
        .text("Monthly PITI");

    svg.selectAll('.bar')
        .data(data)
      .enter().append('rect')
        .attr('class','bar')
        .attr('x', d => x(d.x))
        .attr('width', x.rangeBand())
        .attr('y', d => y(d.y))
        .attr('height', d => height - y(d.y));

    svg.selectAll('.text-label')
        .data(data)
      .enter().append('text')
        .attr('class', 'text-label')
        .text( d => currencyFormat(d.y))
        .attr('x', d => x(d.x) + x.rangeBand()/2)
        .attr('y', d => y(d.y) - 5);

    // Adding the title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 0 - margin.top / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '22px')
        .style('font-weight', 'bold')
        .style('fill', '#333')
        .text('Monthly PITI');
	}
});
