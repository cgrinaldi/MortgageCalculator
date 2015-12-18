import React from 'react';
import d3 from 'd3';
import '../../styles/Chart.scss';

const margin = {top: 20, right: 20, bottom: 20, left: 80},
	fullWidth = 800,
	fullHeight = 300,
	width = fullWidth - margin.left - margin.right,
	height = fullHeight - margin.top - margin.bottom;

const ANIM_BAR_SPEED = 1500;
const ANIM_AXIS_SPEED = 800;

const x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1)
    .domain(['a','b','c','d']);

const y = d3.scale.linear()
			.range([height, 0])
      .domain([0, 100]);

const xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")
      .ticks(4);

const yAxis = d3.svg.axis()
			.scale(y)
			.orient("left");


export default React.createClass({

	render() {
		return (<svg ref="chart"></svg>)
	},

	shouldComponentUpdate({data}){
		// x.domain([0,data.length-1]) // x domain won't change for the calculator
		y.domain([0,d3.max(data, d => d.y)]);
		// xAxis.ticks(Math.min(data.length,30))

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
			.attr("width", "100%")
			.attr("height", "100%")
			.attr('viewBox',`0 0 ${fullWidth} ${fullHeight}`)
			.attr('preserveAspectRatio','xMidYMid')
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		var {data} = this.props;
		console.log('data is', data);

		var svg = d3.select(this.refs.chart).select("g");

		// x.domain([0,data.length-1]) // ordinal scale?
		// y.domain([0,data[0].balance]);

		// xAxis.ticks(Math.min(data.length,30))

    // The 'g' element we are adding is for the xAxis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", `translate(0,${height})`)
			.call(xAxis);

		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)

    svg.selectAll('.bar')
        .data(data)
      .enter().append('rect')
        .attr('class','bar')
        .attr('x', d => x(d.x))
        .attr('width', x.rangeBand())
        .attr('y', d => y(d.y))
        .attr('height', d => height - y(d.y));
	}
});
