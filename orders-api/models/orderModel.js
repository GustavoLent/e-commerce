export default class OrderModel {
    constructor(amount, destiny, id, item) {
        if (!amount || !destiny || !id || !item) {
            throw new Error('Missing Order necessary data')
        } else {
            this.amount = amount
            this.destiny = destiny
            this.id = id
            this.item = item
        }
    }
}