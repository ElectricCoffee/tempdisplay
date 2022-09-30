import { OWMResponseDto } from "../../types/open-weather-map-response-dto";
import { WeatherData } from "../../types/weather-data";

interface WeatherState {
  data?: WeatherData;
}

const INIT_STATE: WeatherState = {
  data: {
    weather: "N/A",
    weatherDescription: "N/A",
    temperature: NaN,
    feelsLike: NaN,
  },
};

export const weather = (state = INIT_STATE, action: any): WeatherState => {
  switch (action.type) {
    // ideally this would have to be set in a constant somewhere
    case "WEATHER_GET": {
      const dto: OWMResponseDto = action.payload;

      const weatherData = !dto.weather
        ? { main: "N/A", description: "N/A" }
        : dto.weather[0];

      const data: WeatherData = {
        weather: weatherData.main,
        weatherDescription: weatherData.description,
        temperature: dto.main.temp,
        feelsLike: dto.main.feels_like,
      };

      return { ...state, data };
    }
    default:
      return { ...state };
  }
};
