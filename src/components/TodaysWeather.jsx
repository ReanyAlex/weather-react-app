import React, { Component } from 'react';

import Forecast from './Forecast';

class TodaysWeather extends Component {
  render() {
    const { currentWeather, currentTime } = this.props;
    return (
      <div className="col-8-md col-12-sm">
        <h1 className="location location-sm col-12-sm">
          {currentWeather.city}, {currentWeather.state}
        </h1>

        <div className="row">
          <div className="current col-2-md">
            <span className="current-condition">
              <img className="current-condition-icon" src={currentWeather.icon_url} alt="" />
              <p className="current-condition-text">{currentWeather.weather}</p>
            </span>
          </div>
          <div className="col-4-md current__temp-box">
            <span className="current__temp-text">{currentWeather.temp_f}</span>
          </div>
          <div className="col-6-md current__temp-box">
            <span className="current__time-text">{currentTime}</span>
          </div>
        </div>

        <div className="row row-padding-b">
          <div className="col-6-md">
            <h3 className="current__temp-head">Today</h3>
            <span className="current__temp-high-title">High:</span>
            <span className="current__temp-value-high">{currentWeather.high_f}</span>
            <span className="divide">|</span>
            <span className="current__temp-low-title">Low:</span>
            <span className="current__temp-value-low">{currentWeather.low_f}</span>
          </div>
          <div className="col-6-md">
            <div className="" />
            <div className="">
              <div className="current__percip-head">Humidty:</div>
              <span className="current-humidity">{currentWeather.relative_humidity}</span>
            </div>
            <div className="">
              <div className="current__percip-head">Total Precip:</div>
              <span className="current-percip">{currentWeather.precip_today_in}</span>
            </div>
          </div>
        </div>
        <Forecast forecastWeather={this.props.forecastWeather} />
      </div>
    );
  }
}

export default TodaysWeather;
