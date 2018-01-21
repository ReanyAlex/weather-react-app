import React, { Component } from 'react';

import TodaysWeather from './TodaysWeather';
import Forecast from './Forecast';
import Chart from './Chart';
import Map from './Map';

class Today extends Component {
  state = {
    currentTime: ''
  };

  componentDidMount() {
    this.getTime();
  }

  getTime() {
    const today = new Date();
    const day = today.getDay();
    const daylist = ['Sunday', 'Monday', 'Tuesday', 'Wednesday ', 'Thursday', 'Friday', 'Saturday'];
    let hours = today.getHours();
    let minutes = today.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    let suffix = 'AM';
    if (hours >= 12) {
      suffix = 'PM';
      hours = hours - 12;
    }
    if (hours === 0) {
      hours = 12;
    }
    const currentTime = `${daylist[day]} ${hours}:${minutes} ${suffix}`;
    this.setState({ currentTime });
  }

  render() {
    return (
      <div>
        <div className="col-8-md col-12-sm">
          <TodaysWeather currentWeather={this.props.currentWeather} currentTime={this.state.currentTime} />
          <Forecast forecastWeather={this.props.forecastWeather} />
          <Chart hourlyData={this.props.hourlyData} />
        </div>
        <Map location={this.props.currentLocation} />
      </div>
    );
  }
}

export default Today;
