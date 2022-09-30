import axios from "axios";
import { Dispatch } from "react";
import { OWMResponseDto } from "../../types/open-weather-map-response-dto";
import { APIKey } from "../../APIKEY";
export const getWeather = () => {
  return async (dispatch: Dispatch<any>) => {
    const [lat, lon] = [57.019602121561995, 9.883959999263695]; // seluxit coordinates
    try {
      const response = await axios.get<OWMResponseDto>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`
      );
      dispatch({ type: "WEATHER_GET", payload: response.data });
    } catch (e) {
      console.error(e);
    }
  };
};
