import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getWeather } from "./redux/actions/weatherActions";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { Card } from "react-bootstrap";
import moment from "moment/moment";

function App() {
  const weatherData = useAppSelector((st) => st.weather.data);
  const dispatch = useAppDispatch();

  const update = () => {
    dispatch(getWeather());
  };

  // fetch data once when the component starts
  useEffect(update, []);

  // fetch again every minute
  useEffect(() => {
    const timer = setTimeout(update, 60_000);
    return () => clearTimeout(timer);
  }, []);

  const time = moment.unix(weatherData.time).format("DD/MM-YYYY HH:mm");

  return (
    <div>
      <Card className="mx-auto mainCard">
        <Card.Body>
          <Card.Text style={{ textAlign: "center" }}>
            <p>
              Current weather for Aalborg:{" "}
              <span className="weather">{weatherData?.weatherDescription}</span>
            </p>
            <h1 className="temp">{weatherData?.temperature}°C</h1>
            <h3 className="feels-like">Feels like {weatherData?.feelsLike}°C</h3>
            <p className="powered-by">
              Powered by <a href="https://openweathermap.org">OpenWeatherMap.org</a>
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
      <p className="last-updated">Last updated {time}</p>
    </div>
  );
}

export default App;
