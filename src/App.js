import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { WeatherInfo } from "./components/weatherInfo";

function App() {
  const [data, setData] = useState({});
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const options = {
    method: "GET",
    url: `https://open-weather13.p.rapidapi.com/city/${cityName}/EN`,
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_OPENWEATHER_API_KEY,
      "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
    },
  };

  const searchCityName = async (event) => {
    console.log("ohh yes", event.key);
    if (!cityName) {
      setError("Please enter city name!");
      return;
    }
    if (event.key === "Enter") {
      // Set loading to true when starting the fetch
      setLoading(true);
      try {
        const response = await axios.request(options);
        setData(response.data);
        if (response.data.cod === "404") {
          setError(
            `Please make sure the city name ${cityName} you entered is correct`
          );
          setData({});
        } else {
          setError("");
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        // Clear the input field and Set loading to false when fetch is complete
        setLoading(false);
        setCityName("");
      }
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={cityName}
          onChange={(event) => {
            setCityName(event.target.value);
            setError("");
          }}
          onKeyPress={searchCityName}
          placeholder="Enter City Name"
          type="text"
        />

        <button
          className="icon"
          onClick={() => searchCityName({ key: "Enter" })}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <h2 className="title">Welcome to the Weather App!</h2>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="container">
          <WeatherInfo data={data} />
        </div>
      )}
    </div>
  );
}

export default App;
