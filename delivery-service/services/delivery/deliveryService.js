import faker from 'faker'
import ShipppingDataModel from '../../models/shipppingDataModel.js'
import DeliveryResponseModel from './deliveryResponseModel.js'

export default class DeliveryService {
    async processNewOrder(order) {
        const packageID = await this.preparePackageToPost(order)
        const shippingData = await this.getShippingData(order)
        return await this._postToDelivery(packageID, shippingData)
    }

    async preparePackageToPost(order) {
        const packageID = faker.datatype.uuid()
        return packageID
    }

    async getShippingData(order) {
        const shippingCompany = faker.company.companyName()
        const shippingPrice = faker.commerce.price()
        const deliveryEstimate = faker.date.soon()

        const shippingData = new ShipppingDataModel(shippingCompany, shippingPrice, deliveryEstimate)
        return shippingData
    }

    async _postToDelivery(packageID, shippingData) {
        const { company, price, deliveryEstimate } = shippingData

        console.log(`Will post:
            - packageID: ${packageID}
            - shipping company: ${company}
            - shipping price: ${price}
            - delivery estimate: ${deliveryEstimate}
        `)

        return new DeliveryResponseModel(packageID, shippingData)
    }
}