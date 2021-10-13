export default class BarbecueResponseModel {
    constructor(weather, barbecueRecommendation) {
        if (weather && barbecueRecommendation) {
            this.country = weather.country
            this.region = weather.region
            this.localtime = weather.localtime
            this.temperature = weather.temperature
            this.weatherCode = weather.weatherCode
            this.weatherDescription = weather.weatherDescription
            this.iconUrl = weather.iconUrl
            this.barbecueRecommendation = barbecueRecommendation
        }
        else {
            throw Error(`
            Missing data in barbecue response. 
            weather: ${weather} 
            barbecueRecommendation: ${barbecueRecommendation} 
            `)
        }
    }
}