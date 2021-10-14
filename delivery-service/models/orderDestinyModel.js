export default class OrderDestinyModel {
    constructor(state, city, address) {
        if (!state || !city || !address) {
            console.error(`Missing data on OrderDestinyModel { 
                state: ${state}
                city: ${city}
                address: ${address}
            }`)
            throw new Error('Missing data on OrderDestinyModel')
        }
        else {
            this.state = state
            this.city = city
            this.address = address
        }
    }
}
