import "./App.css";
import { useState, useEffect } from "react";
import Sunny from "./assets/Sunny.webp";
import Landing from "./assets/Landing.webp";
import Rainy from "./assets/Rainy.webp";
import Cloudy from "./assets/Cloudy.webp";
import Mist from "./assets/Mist.webp";
import SearchIcon from "@mui/icons-material/Search";
import Footer from "./components/Footer";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("patna");

  useEffect(() => {
    // console.log("hello")
    searchLocation();
  },[location]);

  const searchLocation = () => {
    // if (e.key === "Enter") {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=395db76ac064ef1b61707d3c617be3b5`;
    fetch(url)
      .then((response) => response.json())
      .then((place) =>
        setData({
          name: place.name,
          // region: place.location.region,
          country: place.sys.country,
          celsius: {
            current: place.main.temp,
            // high: place.forecast.forecastday[0].day.maxtemp_c,
            // low: place.forecast.forecastday[0].day.mintemp_c,
          },
          condition: place.weather[0].description,
          wind_speed: place.wind.speed,
          humidity: place.main.humidity,
          feels_like: place.main.feels_like,
        })
      );
    // }
    // setLocation("");
  };
  // searchLocation();

  return (
    <>
      <div
        className="App"
        style={
          data.condition?.toLowerCase() === "sunny" ||
          data.condition?.includes("Clear") ||
          data.condition?.includes("clear")
            ? { background: `url(${Sunny}) no-repeat center center/cover` }
            : data.condition?.includes("Rain") ||
              data.condition?.includes("rain") ||
              data.condition?.toLowerCase() === "light drizzle" ||
              data.condition?.toLowerCase() === "patchy rain possible"
            ? { background: `url(${Rainy}) no-repeat center center/cover` }
            : data.condition?.includes("Cloud") ||
              data.condition?.includes("cloud")
            ? { background: `url(${Cloudy}) no-repeat center center/cover` }
            : data.condition?.includes("Mist") ||
              data.condition?.includes("mist") ||
              data.condition?.includes("Haze") ||
              data.condition?.includes("haze") ||
              data.condition?.includes("Fog") ||
              data.condition?.includes("fog")
            ? { background: `url(${Mist}) no-repeat center center/cover` }
            : { background: `url(${Landing}) no-repeat center center/cover` }
        }
      >
        <div className="search">
          <p style={{ color: "white" }}>Weather App</p>
          <div>
            <input
              // value={location}
              onChange={(event) => setLocation(event.target.value)}
              // onKeyPress={searchLocation}
              placeholder="Enter Location"
              type="text"
            />
            <SearchIcon
              onClick={searchLocation}
              fontSize="large"
              className="search-button"
            />
          </div>
        </div>
        {data.name !== undefined && (
          <div className="container">
            <div className="top">
              <div className="temp">
                <h1>{data.celsius?.current.toFixed()}℃</h1>
              </div>
              <div className="location">
                <p>
                  {data.name}
                </p>
              </div>
              <div className="country">
                <p>{data.country}</p>
              </div>
              <div className="description">
                <p>{data.condition}</p>
              </div>
            </div>

            <div className="bottom">
              <div className="feels">
                <p className="bold">{data.feels_like.toFixed()}℃</p>
                <p>Feels like</p>
              </div>
              <div className="humidity">
                <p className="bold">{data.humidity.toFixed()}%</p>
                <p>Humidity</p>
              </div>
              <div className="wind">
                <p className="bold">{data.wind_speed.toFixed()} MPH</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
