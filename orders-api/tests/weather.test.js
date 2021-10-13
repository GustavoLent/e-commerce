import WeatherService from "../services/weather/weatherService";
import jest from 'jest-mock';
import testsData from "./testsData";
import WeatherModel from "../services/weather/weatherModel";

const weather = new WeatherService()
const { mockedCity, requestResponse, wheaterData } = testsData

test('validate request response', async () => {
    const mockRequest = jest.fn();
    WeatherService.prototype._requestWeatherData = mockRequest;
    mockRequest.mockReturnValue(Promise.resolve(requestResponse));

    const res = await weather.getWeatherData(mockedCity)

    expect(res).toEqual(wheaterData);

    mockRequest.mockRestore()
});

test('should validate if instance contains all parameters', () => {
    // Note: the function that throws an exception needs to be invoked within a wrapping function otherwise the toThrow assertion will fail.
    expect(() => new WeatherModel()).toThrow();
});
