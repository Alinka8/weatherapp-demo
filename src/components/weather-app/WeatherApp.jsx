import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "../weatherCard/WeatherCard";
import "./weatherApp.style.css";

const WeatherApp = () => {
  const [tempreture, setTempreture] = useState(0);
  const [description, setDescription] = useState(0);
  const [feelsLikeTemp, setFeelsLikeTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [searchCity, setSearchCity] = useState("");
  const [city, setCity] = useState("Chicago");

  useEffect(() => {
    console.log("works");
    getSearchCity();
  }, []);

  const getSearchCity = async () => {
    // const todaysDate = new Date();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          searchCity ? searchCity : "Chicago"
        }&units=imperial&appid=355cf3bff397cfe55bf144d10da9b2d8`
      );
      console.log("response", response);

      const { data } = response;
      //set data
      setTempreture(data.main.temp);
      setDescription(data.weather[0].description);
      setFeelsLikeTemp(data.main.feels_like);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setCity(data.name);
    } catch (error) {
      console.log("err", error);
    }
  };

  const onChangeHandler = (e) => {
    setSearchCity(e.target.value);
  };
  return (
    <div className="description">
      <div className="container">
        {/* <p>Current time {todaysDate.toLocaleString()}</p> */}
        {/* <p>Happy {getDayofTheWeek()}</p> */}
        <input
          placeholder="enter the city"
          onChange={onChangeHandler}
          value={searchCity}
        />
        <button onClick={getSearchCity} variant="outlined">
          Get the weather
        </button>
        {city && (
          <WeatherCard
            city={city}
            humidity={humidity}
            description={description}
            feelsLikeTemp={feelsLikeTemp}
            wind={wind}
            tempreture={tempreture}
          />
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
