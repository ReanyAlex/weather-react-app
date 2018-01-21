import React, { Component } from 'react';

import TodaysWeather from './TodaysWeather';
import Map from './Map';

class Today extends Component {
  state = {
    currentTime: Number
  };
  componentDidMount() {
    this.getTime();
  }

  getTime() {
    var today = new Date();
    var day = today.getDay();
    var daylist = ['Sunday', 'Monday', 'Tuesday', 'Wednesday ', 'Thursday', 'Friday', 'Saturday'];
    let hours = today.getHours();
    let minutes = today.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    var suffix = 'AM';
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

  renderCurrentWeather() {
    return (
      <div>
        <TodaysWeather
          currentWeather={this.props.currentWeather}
          forecastWeather={this.props.forecastWeather}
          currentTime={this.state.currentTime}
          hourlyData={this.props.hourlyData}
        />
        <Map location={this.props.currentLocation} />
      </div>
    );
  }

  render() {
    return <div>{this.renderCurrentWeather()}</div>;
  }
}

export default Today;
