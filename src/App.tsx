import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getWeather } from "./redux/actions/weatherActions";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { Card } from "react-bootstrap";

function App() {
  const weatherData = useAppSelector((st) => st.weather.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWeather());
  }, []);

  return (
    <Card className="mx-auto mainCard">
      <Card.Body>
        <Card.Text style={{ textAlign: "center" }}>
          <p>
            Current weather for Aalborg:{" "}
            <span className="weather">{weatherData?.weatherDescription}</span>
          </p>
          <h1 className="temp">{weatherData?.temperature}°C</h1>
          <h3 className="feels-like">Feels like {weatherData?.feelsLike}°C</h3>
          Powered by <a href="https://openweathermap.org">OpenWeatherMap.org</a>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default App;
