import OrderDestinyModel from './orderDestinyModel.js'

export default class OrderFromStreamModel {
    constructor(amount, destiny, id, item) {
        if (!amount || (!destiny || !destiny instanceof OrderDestinyModel) || !id || !item) {
            console.error(`Missing data on OrderFromStreamModel { 
                amount: ${amount}
                destiny: ${destiny}
                id: ${id}
                item: ${item}
            }`)

            throw new Error('Missing data on OrderFromStreamModel')
        }
        else {
            this.amount = amount
            this.destiny = destiny
            this.id = id
            this.item = item
        }
    }
}
