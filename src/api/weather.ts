type WeatherData = {
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
};

export async function getWeatherData() {
  const url = `http://api.weatherapi.com/v1/current.json?key=${
    import.meta.env.VITE_WEATHER_API_KEY
  }&q=Colombo&aqi=no`;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const weatherData: WeatherData = {
        temp_c: data.current.temp_c,
        condition: {
          text: data.current.condition.text,
          icon: data.current.condition.icon,
        },
      };
      console.log(weatherData);
      return weatherData;
    });
}
