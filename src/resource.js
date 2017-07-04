const renderer = require("./renderer");
const HoverText = require("./hoverText");

const ResourceType = {
    crystal: {
        color: "#a7d8de",
        name: "Crystals"
    },
    metal: {
        color: "#c34007",
        name: "Metals"
    },
    fuel: {
        color: "#f90096",
        name: "Erchius Fuel"
    }
}

class Resource extends createjs.Shape {
    constructor(id, x, y, type) {
        super();
        this.graphics
            .beginFill(type.color)
            .drawRect(x, y, renderer.gtp, renderer.gtp)
            .endFill();
        this.text = new HoverText(type.name, "20px Fira Mono", type.color, x, y);
        renderer.addResource(this);
    }

    addStage(stage) {
        stage.addChild(this);
        this.text.addStage(stage, this);
    }
}

module.exports = {
    Resource,
    ResourceType
}