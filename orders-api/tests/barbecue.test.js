import app from '../app.js'
import BarbecueService from "../services/barbecue/barbecueService";
import jest from 'jest-mock';
import request from 'supertest'
import testsData from "./testsData";
import WeatherService from "../services/weather/weatherService";

const barbecueService = new BarbecueService()
const { mockedCity, wheaterData, barbecueResponse } = testsData

test('validate barbecue recommendation', async () => {
    const mockWeatherData = jest.fn();
    WeatherService.prototype.getWeatherData = mockWeatherData;
    mockWeatherData.mockReturnValue(Promise.resolve(wheaterData));

    const res = await barbecueService.getBarbecueRecomendation(mockedCity)

    expect(res).toEqual(barbecueResponse);

    mockWeatherData.mockRestore()
});

test('barbecue route must contain a city parameter', async () => {
    const res = await request(app).get('/barbecue')

    expect(res.statusCode).toEqual(404)
});
