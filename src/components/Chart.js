import React, { Component } from 'react';
import * as d3 from 'd3';
//import './App.css'

class Chart extends Component {
  state = {
    showChart: false
  };

  createLineChart() {
    const hourlyData = this.props.hourlyData.tempArray;
    const { initialHour } = this.props.hourlyData;

    var div = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    var margin = { top: 50, right: 50, bottom: 50, left: 50 },
      width = document.getElementById('forecast').offsetWidth - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
    var n = hourlyData.length;
    var xScale = d3
      .scaleLinear()
      .domain([0, 35])
      .range([0, width]);

    var yScale = d3
      .scaleLinear()
      .domain([d3.min(hourlyData) - 5, d3.max(hourlyData) + 5])
      .range([height, 0]);

    var line = d3
      .line()
      .x(function(d, i) {
        return xScale(i);
      })
      .y(function(d, i) {
        return yScale(d.y);
      })
      .curve(d3.curveCardinal);
    var dataset = d3.range(n).map(function(d, i) {
      return { y: hourlyData[i] };
    });

    var svg = d3
      .select('.d3--line')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(
        d3
          .axisBottom(xScale)
          .ticks(12)
          .tickFormat(function(d) {
            d = d + parseInt(initialHour, 10);
            if (d === 12 || d === 36) {
              return 12 + ' PM';
            } else if (d === 0 || d === 24) {
              return 12 + ' AM';
            } else if (d >= 12 && d < 25) {
              return d - 12 + ' PM';
            } else if (d >= 25 && d < 37) {
              return d - 24 + ' AM';
            } else if (d >= 37 && d < 49) {
              return d - 36 + ' PM';
            } else if (d >= 49 && d < 61) {
              return d - 48 + ' AM';
            }
            return d + ' AM';
          })
      )
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', function(d) {
        return 'rotate(-65)';
      });

    svg
      .append('g')
      .attr('class', 'y axis')
      .call(
        d3
          .axisLeft(yScale)
          .ticks(8)
          .tickFormat(function(d) {
            return d + '°F';
          })
      );

    svg
      .append('path')
      .datum(dataset)
      .attr('class', 'line')
      .attr('d', line);

    svg
      .selectAll('.dot')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', function(d, i) {
        return xScale(i);
      })
      .attr('cy', function(d) {
        return yScale(d.y);
      })
      .attr('r', 4)
      .on('mouseover', function(d) {
        div
          .transition()
          .duration(200)
          .style('opacity', 0.9);
        div
          .html(`${d.y} °F`)
          .style('left', d3.event.pageX + 'px')
          .style('top', d3.event.pageY - 28 + 'px');
      })
      .on('mouseout', function(d) {
        div
          .transition()
          .duration(500)
          .style('opacity', 0);
      });
  }
  componentDidMount() {
    // document.getElementById('d3').innerHTML = '';
    // this.createLineChart();
  }

  componentDidUpdate() {
    // document.getElementById('d3').innerHTML = '';
    this.createLineChart();
  }

  mountChart() {
    document.getElementById('d3').innerHTML = '';
    // this.createLineChart();
    this.setState({ showChart: false });
  }

  showChart() {
    return this.state.showChart ? (
      <div id="d3" className="d3 d3--line" onClick={() => this.mountChart()} />
    ) : (
      <div id="forecast" className="row forecastToggle" onClick={() => this.setState({ showChart: true })}>
        <p>Click To See Hourly Temperature Chart</p>
      </div>
    );
  }

  render() {
    return this.showChart();
  }
}

export default Chart;
