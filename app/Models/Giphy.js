export default class Giphy {
    constructor(data) {
        this.title = data.title
    }

    get Template() {
        return this.title
    }
}