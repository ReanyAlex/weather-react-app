import React, { Component } from 'react';
import axios from 'axios';

import conditionImage from './weatherJson';
import Search from './components/Search';
import Today from './components/Today';

class App extends Component {
  state = {
    currentLocation: {},
    currentWeather: {},
    forecastWeather: [],
    hourlyData: [],
    searchError: false
  };

  componentDidMount() {
    this.currentLocation();
  }

  backgroundImage(weather) {
    if (!conditionImage[weather].photo) {
      document.body.style.backgroundImage = `url( ${conditionImage['Clear'].photo} )`;
    } else {
      document.body.style.backgroundImage = `url( ${conditionImage[weather].photo} )`;
    }
  }

  currentLocation() {
    navigator.geolocation.getCurrentPosition(location => {
      const currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };
      this.setState({ currentLocation });
      this.fetchWeatherData();
    });
  }

  searchLocation(searchValue) {
    this.fetchWeatherData(searchValue);
  }

  fetchWeatherData(searchValue) {
    if (!(Object.keys(this.state.currentLocation).length === 0)) {
      let { latitude, longitude } = this.state.currentLocation;
      const apiKey = 'bb2c8e49097ff6ad';

      let location = latitude + ',' + longitude;
      let locWeatherUrl = `https://api.wunderground.com/api/${apiKey}/conditions/q/${location}.json`;
      let weatherForecastUrl = `https://api.wunderground.com/api/${apiKey}/forecast10day/q/${location}.json`;
      let houlryForecast = `http://api.wunderground.com/api/${apiKey}/hourly/q/${location}.json`;
      if (searchValue) {
        locWeatherUrl = `https://api.wunderground.com/api/${apiKey}/conditions/q/${searchValue}.json`;
        weatherForecastUrl = `https://api.wunderground.com/api/${apiKey}/forecast10day/q/${searchValue}.json`;
        houlryForecast = `http://api.wunderground.com/api/${apiKey}/hourly/q/${searchValue}.json`;
      }

      const current = axios.get(locWeatherUrl).then(current => current);
      const forecast = axios.get(weatherForecastUrl).then(forcast => forcast);
      const hourly = axios.get(houlryForecast);

      Promise.all([current, forecast, hourly])
        .then(weatherData => {
          const current = weatherData[0];
          const forecast = weatherData[1];
          const hourly = weatherData[2].data.hourly_forecast;

          const { city, state } = current.data.current_observation.display_location;
          const { weather, icon_url, temp_f, relative_humidity, precip_today_in } = current.data.current_observation;
          const high_f = forecast.data.forecast.simpleforecast.forecastday[0].high.fahrenheit;
          const low_f = forecast.data.forecast.simpleforecast.forecastday[0].low.fahrenheit;

          //
          const currentWeather = {
            city,
            state,
            weather,
            icon_url,
            temp_f,
            relative_humidity,
            precip_today_in,
            high_f,
            low_f
          };

          const forecastWeather = forecast.data.forecast.simpleforecast.forecastday;

          const currentLocation = {
            latitude: current.data.current_observation.display_location.latitude,
            longitude: current.data.current_observation.display_location.longitude
          };
          const hourlyData = { tempArray: [], initialHour: hourly[0].FCTTIME.hour };

          hourly.forEach(hour => {
            hourlyData.tempArray.push(+hour.temp.english);
          });
          this.setState({ currentWeather, forecastWeather, currentLocation, hourlyData, searchError: false });
          this.backgroundImage(weather);
        })
        .catch(err => {
          console.log(err);
          this.setState({ searchError: true });
        });
    }
  }

  shouldRender() {
    const { currentWeather, forecastWeather, currentLocation, hourlyData } = this.state;
    if (!(Object.keys(currentWeather).length === 0)) {
      return (
        <div>
          <Search searchLocation={this.searchLocation.bind(this)} />
          <div className="wrapper content-box">
            <Today
              currentWeather={currentWeather}
              forecastWeather={forecastWeather}
              currentLocation={currentLocation}
              hourlyData={hourlyData}
            />
          </div>
        </div>
      );
    } else {
      return <h1>Loading!</h1>;
    }
  }

  render() {
    return <div className="App">{this.shouldRender()}</div>;
  }
}

export default App;
