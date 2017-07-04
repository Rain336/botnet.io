const renderer = require("./renderer");

class HoverText extends createjs.Container {
    constructor(text, font, color, x, y) {
        super();
        this.text = new createjs.Text(text, font, color);
        this.text.textAlign = "center";
        this.text.textBaseline = "middle";

        this.box = new createjs.Shape();
        const bounds = this.text.getBounds();
        this.box.graphics
            .beginFill("#FFFFFF")
            .drawRect(0, 0, bounds.width + 10, bounds.height + 10)
            .endFill();
        this.box.alpha = 0.3;
        this.text.x = bounds.width / 2 + 5;
        this.text.y = bounds.height / 2 + 5;

        this.visible = false;
        this.addChild(this.box, this.text);
        this.x = x * renderer.bo;
        this.y = y * renderer.bo + 5 + renderer.gtp;
    }

    addStage(stage, target) {
        const container = this;

        target.on("mouseover", function (event) {
            container.visible = true;
            stage.update();
        });
        target.on("mouseout", function (event) {
            container.visible = false;
            stage.update();
        });

        stage.addChild(this);
    }
}

module.exports = HoverText;