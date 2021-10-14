export default class ShipppingDataModel {
    constructor(company, price, deliveryEstimate) {
        this._validate(company, price, deliveryEstimate)

        this.company = company
        this.price = price
        this.deliveryEstimate = deliveryEstimate
    }

    _validate(company, price, deliveryEstimate) {
        if (!company || !price || !deliveryEstimate) {
            console.error(`Missing data on ShipppingDataModel {
                company: ${company}
                price: ${price}
                deliveryEstimate: ${deliveryEstimate}
            }`)
            throw new Error('Missing data on ShipppingDataModel')
        }
    }
}