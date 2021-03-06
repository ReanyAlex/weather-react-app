import React, { Component } from 'react';

import ForecastDay from './forecastDay';

class Forecast extends Component {
  state = {
    showForecast: false
  };

  createForecastComponet(forecast) {
    if ([1, 9, 10].includes(forecast.period)) {
      return;
    }
    return <ForecastDay key={forecast.period} forecast={forecast} />;
  }

  showForecast() {
    const { forecastWeather } = this.props;

    return this.state.showForecast ? (
      <div id="forecast" className="row forecastDiv" onClick={() => this.setState({ showForecast: false })}>
        {forecastWeather.map(forecast => this.createForecastComponet(forecast))}
      </div>
    ) : (
      <div id="forecast" className="row forecastToggle" onClick={() => this.setState({ showForecast: true })}>
        <p>Click To See Forecast</p>
      </div>
    );
  }

  render() {
    return this.showForecast();
  }
}

export default Forecast;
