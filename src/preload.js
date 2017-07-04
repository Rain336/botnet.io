class Preload extends createjs.LoadQueue {
    constructor() {
        super();
        this.on("complete", function (event) {
        });
    }
}

module.exports = new Preload();