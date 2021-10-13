export default class ResponseModel {
    constructor(message, success) {
        this.message = message
        this.success = success
    }

    static successResponse(message) {
        return new ResponseModel(message, true)
    }

    static errorResponse(message) {
        return new ResponseModel(message, false)
    }
}