import ShipppingDataModel from "../../models/shipppingDataModel.js"

export default class DeliveryResponseModel {
    constructor(packageID, shippingData) {
        this._validate(packageID, shippingData)

        this.packageID = packageID
        this.shippingData = shippingData
    }

    _validate(packageID, shippingData) {
        if (!packageID || !shippingData || !(shippingData instanceof ShipppingDataModel)) {
            console.error(`Missing data on DeliveryResponseModel {
                packageID: ${packageID}
                shippingData: ${shippingData}
            }`)
            throw new Error('Missing data on DeliveryResponseModel')
        }
    }
}
