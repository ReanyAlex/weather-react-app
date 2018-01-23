import React from 'react';

const Forecast = props => {
  const { forecast } = props;
  console.log(forecast);
  return (
    <div className="forecast col-forecast7-md col-3-sm">
      <div>
        <span className="forecast-date"> {forecast.date.weekday_short} </span>
      </div>
      <div>
        <span className="forecast-date"> {`${forecast.date.monthname_short} ${forecast.date.day} `} </span>
      </div>
      <div className="forecast-hl">
        <span className="forecast-h"> {forecast.high.fahrenheit} </span>
        <span> | </span>
        <span className="forecast-l"> {forecast.low.fahrenheit} </span>
      </div>
      <div>
        <img className="forecast-icon" src={forecast.icon_url} alt="forecast icon" />
      </div>
      <div>
        <span className="forecast-conditions"> </span>
      </div>
      <div>
        <span className="forecast-pop">☂ {forecast.qpf_allday.in} in.</span>
      </div>
    </div>
  );
};

export default Forecast;
