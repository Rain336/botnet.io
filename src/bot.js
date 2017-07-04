const HoverText = require("./hoverText");
const renderer = require("./renderer");

class Bot extends createjs.Shape {
    constructor(id, name, x, y, color) {
        super();
        this.id = id;
        this.graphics
            .beginFill(color)
            .drawCircle(x * renderer.bo + renderer.gtp / 2, y * renderer.bo + renderer.gtp / 2, renderer.gtp / 2)
            .endFill();
        this.text = new HoverText(name, "20px Fira Mono", color, x, y);
        renderer.addBot(this);
    }

    addStage(stage) {
        stage.addChild(this);
        this.text.addStage(stage, this);
    }
}

module.exports = Bot;