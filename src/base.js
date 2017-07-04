const HoverText = require("./hoverText.js");
const renderer = require("./renderer");

class Base extends createjs.Shape {
    constructor(name, x, y, color) {
        super();
        this.graphics
            .beginFill(color)
            .drawRoundRect(x * renderer.bo, y * renderer.bo, renderer.gtp, renderer.gtp, 15)
            .endFill();
        this.text = new HoverText(name, "20px Fira Mono", color, x, y);
    }

    static fromBuffer(buffer) {
        return new Base(buffer.readString(), buffer.readShort(), buffer.readShort(), buffer.readString())
    }

    addStage(stage) {
        stage.addChild(this);
        this.text.addStage(stage, this);
    }
}

module.exports = Base;