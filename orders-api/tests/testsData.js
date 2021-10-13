import BarbecueResponseModel from "../services/barbecue/barbecueResponseModel";
import getRecommendation from "../services/barbecue/getBarbecueRecommendation";
import WeatherModel from "../services/weather/weatherModel";

const mockedCity = "Moscow"
const weather_code = 113

const requestResponse = {
    "request": {
        "type": "City",
        "query": "Moscow, Russia",
        "language": "en",
        "unit": "m"
    },
    "location": {
        "name": "Moscow",
        "country": "Russia",
        "region": "Moscow City",
        "lat": "55.752",
        "lon": "37.616",
        "timezone_id": "Europe\/Moscow",
        "localtime": "2021-10-07 18:41",
        "localtime_epoch": 1633632060,
        "utc_offset": "3.0"
    },
    "current": {
        "observation_time": "03:41 PM",
        "temperature": 8,
        "weather_code": weather_code,
        "weather_icons": [
            "https:\/\/assets.weatherstack.com\/images\/wsymbols01_png_64\/wsymbol_0008_clear_sky_night.png"
        ],
        "weather_descriptions": [
            "Clear"
        ],
        "wind_speed": 4,
        "wind_degree": 120,
        "wind_dir": "ESE",
        "pressure": 1041,
        "precip": 0,
        "humidity": 53,
        "cloudcover": 0,
        "feelslike": 7,
        "uv_index": 4,
        "visibility": 10,
        "is_day": "no"
    }
}
const country = requestResponse.location.country
const region = requestResponse.location.region
const localtime = requestResponse.location.localtime
const temperature = requestResponse.current.temperature
const weatherCode = requestResponse.current.weather_code
const weatherDescription = requestResponse.current.weather_descriptions[0]
const iconUrl = requestResponse.current.weather_icons[0]

const wheaterData = new WeatherModel(country, region, localtime, temperature, weatherCode, weatherDescription, iconUrl)

const barbecueRecommendation = getRecommendation(weather_code)
const barbecueResponse = new BarbecueResponseModel(wheaterData, barbecueRecommendation)

export default { mockedCity, requestResponse, wheaterData, barbecueRecommendation, barbecueResponse }