export default class IncommingOrderModel {
    constructor(amount, destiny, item) {
        if (!amount || !destiny || !item) {
            throw new Error('Missing Incomming Order necessary data')
        } else {
            this.amount = amount
            this.destiny = destiny
            this.item = item
        }
    }
}