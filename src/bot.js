const HoverText = require("./hoverText.js");
const renderer = require("./renderer");

class Bot extends createjs.Shape {
    constructor(name, x, y, color) {
        super();
        this.graphics
            .beginFill(color)
            .drawCircle(x * renderer.bo + renderer.gtp / 2, y * renderer.bo + renderer.gtp / 2, renderer.gtp / 2)
            .endFill();
        this.text = new HoverText(name, "20px Fira Mono", color, x, y);
    }

    static fromBuffer(buffer) {
        return new Bot(buffer.readString(), buffer.readVarint(), buffer.readVarint(), buffer.readString())
    }

    addStage(stage) {
        stage.addChild(this);
        this.text.addStage(stage, this);
    }
}

module.exports = Bot;