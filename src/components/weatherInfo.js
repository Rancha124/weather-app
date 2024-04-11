import "../App.css";
export const WeatherInfo = ({ data }) => {
  return (
    <>
      <div className="main-weather-info">
        <div className="cityname">
          <p>{data.name}</p>
        </div>
        <div className="temp">
          {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
        </div>
        <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
      </div>

      {data.name !== undefined && data.main && (
        <div className="sub-weather-info">
          <div className="row">
            {data.main.feels_like ? (
              <div className="feels">
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
                <p>Feels Like</p>{" "}
              </div>
            ) : null}
            {data.main.humidity ? (
              <div className="humidity">
                <p className="bold">{data.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            ) : null}
            {data.wind.speed ? (
              <div className="wind">
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
                <p>Wind Speed</p>
              </div>
            ) : null}
          </div>
          <div className="row">
            {data.main.pressure ? (
              <div className="wind">
                <p className="bold">{data.main.pressure.toFixed()} hPa</p>
                <p>Pressure</p>
              </div>
            ) : null}
            {data.visibility ? (
              <div className="wind">
                <p className="bold">{data.visibility.toFixed()} m</p>
                <p>Visibility</p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};
