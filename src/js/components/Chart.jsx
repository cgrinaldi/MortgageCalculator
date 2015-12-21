import React from 'react';
import d3 from 'd3';
import _ from 'lodash';
import '../../styles/Chart.scss';

const margin = {top: 85, right: 20, bottom: 30, left: 100},
	fullWidth = 850,
	fullHeight = 375,
	width = fullWidth - margin.left - margin.right,
	height = fullHeight - margin.top - margin.bottom;

const ANIM_BAR_SPEED = 1500;
const ANIM_AXIS_SPEED = 800;

const toolTipHeight = 100;
const toolTipGap = 10;
const fontFamily = 'Lato';

const percentFormatter = d3.format(',.0%')

export default React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired,
    title: React.PropTypes.string.isRequired,
		yAxisLabel: React.PropTypes.string.isRequired,
		labelFormatter: React.PropTypes.func.isRequired
  },

  render () {
    return (
			<div className="chart" ref="container">
				<svg ref="chart"></svg>
			</div>
    );
  },

  initialize () {
		const {data, labelFormatter} = this.props;
		console.log('data in init is', data);
    var domain = this.calculateDomains(data);
    this.x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1)
        .domain(domain.x);

    this.y = d3.scale.linear()
    			.range([height, 0])
          .domain(domain.y);

    this.xAxis = d3.svg.axis()
    			.scale(this.x)
    			.orient("bottom");

    this.yAxis = d3.svg.axis()
    			.scale(this.y)
    			.orient("left")
					.ticks(8)
          .tickFormat(labelFormatter);
  },

  calculateDomains (data) {
    var maxVal = d3.max(data, d => d.y);
    return {
      x: _.pluck(data, 'x'),
      y: [0, 1.1 * maxVal]
    };
  },

  componentDidMount() {
    this.initialize();
    const {x, y, xAxis, yAxis} = this;
    // The 'g' element we are adding below is the grouping for the entire chart
    d3.select(this.refs.chart)
    .attr("width", fullWidth)
    .attr("height", fullHeight)
    .attr('preserveAspectRatio','xMidYMid')
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

    var {data, title, yAxisLabel, labelFormatter} = this.props;

    var svg = d3.select(this.refs.chart).select("g");

    // The 'g' element we are adding is for the xAxis
    var a = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0,${height+5})`)
        .call(xAxis);

		a.selectAll('text')
			.attr('dy', 15);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
				.attr("class", "axisLabel")
        .attr("transform", "rotate(-90)")
        .attr("y", -75)
        .attr("x", -90)
        .attr("dy", ".9em")
        .style("text-anchor","end")
        .text(yAxisLabel);

		const barWidthPercent = 0.6
    svg.selectAll('.bar')
        .data(data)
      .enter().append('rect')
        .attr('class','bar')
        .attr('x', d => x(d.x) + 0.5 * (1 - barWidthPercent) * x.rangeBand())
        .attr('width', barWidthPercent * x.rangeBand())
        .attr('y', d => y(d.y))
        .attr('height', d => height - y(d.y));


		// Adding tool tips
		// Box
		svg.selectAll('.tool-tip')
				.data(data)
		.enter().append('rect')
				.attr('class', 'tool-tip')
				.attr('x', d => x(d.x) + (1 - 0.9) * x.rangeBand() / 2)
				.attr('y', d => y(d.y) - toolTipHeight - toolTipGap)
				.style('height', toolTipHeight)
				.style('width', 0.9 * x.rangeBand());

		// Text #1
		svg.selectAll('.top-data-label')
				.data(data)
			.enter().append('text')
				.attr('class', 'top-data-label data-label')
				.attr('x', d => x(d.x) + x.rangeBand()/2)
				.attr('y', d => y(d.y) - toolTipHeight - toolTipGap + 17)
				.style('text-anchor', 'middle')
				.text('Down Payment');

		svg.selectAll('.top-data-point')
				.data(data)
			.enter().append('text')
				.attr('class', 'top-data-point data-point')
				.attr('x', d => x(d.x) + x.rangeBand()/2)
				.attr('y', d => y(d.y) - toolTipHeight - toolTipGap + 42)
				.style('text-anchor', 'middle')
				.text(d => labelFormatter(d.downPayment));

		// Text #2
		svg.selectAll('.bottom-data-label')
				.data(data)
			.enter().append('text')
				.attr('class', 'bottom-data-label data-label')
				.attr('x', d => x(d.x) + x.rangeBand()/2)
				.attr('y', d => y(d.y) - toolTipHeight - toolTipGap + 65)
				.style('text-anchor', 'middle')
				.style('fill', d => d.frontendDTI >= .45 ? 'red' : 'black')
				.text('Frontend DTI');

		svg.selectAll('.bottom-data-point')
				.data(data)
			.enter().append('text')
				.attr('class', 'bottom-data-point data-point')
				.attr('x', d => x(d.x) + x.rangeBand()/2)
				.attr('y', d => y(d.y) - toolTipHeight - toolTipGap + 90)
				.style('text-anchor', 'middle')
				.style('fill', d => d.frontendDTI >= .45 ? 'red' : 'black')
				.text(d => percentFormatter(d.frontendDTI));

    // Adding the title
    svg.append('text')
				.attr('class', 'title')
        .attr('x', width / 2)
        .attr('y', 0 - margin.top / 2)
        .attr('text-anchor', 'middle')
        .text(title);
  },

	shouldComponentUpdate({data}){
		console.log('data in update is', data);
		const {x, y, xAxis, yAxis} = this;
		const {labelFormatter} = this.props;
		y.domain(this.calculateDomains(data).y);

		var svg=d3.select(this.refs.chart)
			.select("g");

    var bars = svg.selectAll('.bar')
      .data(data);

    bars
      .transition()
      .duration(ANIM_BAR_SPEED)
      .ease('back-out')
        .attr('y', d => y(d.y))
        .attr('height', d => height - y(d.y));

		svg.select(".y.axis")
      .transition()
			.duration(ANIM_AXIS_SPEED)
			.call(yAxis);

		var tooltips = svg.selectAll('.tool-tip')
			.data(data);

		tooltips
			.transition()
			.duration(ANIM_BAR_SPEED)
			.ease('back-out')
				.attr('y', d => y(d.y) - toolTipHeight - toolTipGap)
				.style('opacity', d => d.y === 0 ? 0 : 1);


    var topDataLabels = svg.selectAll('.top-data-label')
        .data(data);

    topDataLabels
      .transition()
      .duration(ANIM_BAR_SPEED)
      .ease('back-out')
        .attr('y', d => y(d.y) - toolTipHeight - toolTipGap + 17);

		var topDataPoints = svg.selectAll('.top-data-point')
				.data(data);

		topDataPoints
			.transition()
			.duration(ANIM_BAR_SPEED)
			.ease('back-out')
				.attr('y', d => y(d.y) - toolTipHeight - toolTipGap + 42)
				.text(d => labelFormatter(d.downPayment));

		var bottomDataLabels = svg.selectAll('.bottom-data-label')
        .data(data);

    bottomDataLabels
      .transition()
      .duration(ANIM_BAR_SPEED)
      .ease('back-out')
        .attr('y', d => y(d.y) - toolTipHeight - toolTipGap + 65)
				.style('fill', d => d.frontendDTI >= .45 ? 'red' : 'black');

		var bottomDataPoints = svg.selectAll('.bottom-data-point')
				.data(data);

		bottomDataPoints
			.transition()
			.duration(ANIM_BAR_SPEED)
			.ease('back-out')
				.attr('y', d => y(d.y) - toolTipHeight - toolTipGap + 90)
				.style('fill', d => d.frontendDTI >= .45 ? 'red' : 'black')
				.text(d => percentFormatter(d.frontendDTI));


		return false;
	}

});
