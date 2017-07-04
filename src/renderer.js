const grid = require("./grid");
const preload = require("./preload");
const Label = require("./label");
const player = require("./player");

class Renderer {
    constructor() {
        this.stage = new createjs.Stage("game");
        this.x = 0;
        this.y = 0;
        this.gtp = 0;
        this.bo = this.gtp + 7;
        this.bases = [];
        this.bots = [];
        this.resources = [];
        /*this.crystal = new Label(preload.getResult("iconCrystal"), "0", "20px Fira Mono", "blue", 140, 20);
        this.metal = new Label(preload.getResult("iconMetal"), "0", "20px Fira Mono", "blue", 90, 20);
        this.fuel = new Label(preload.getResult("iconFuel"), "0", "20px Fira Mono", "blue", 40, 20);*/
        this.stage.enableMouseOver();
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", this.stage)
    }

    init() {
        grid(this.stage);

        this.bases.forEach(b => b.addStage(this.stage));
        this.bots.forEach(b => b.addStage(this.stage));
        this.resources.forEach(b => b.addStage(this.stage));

        //this.stage.addChild(this.fuel, this.metal, this.crystal);

        this.stage.update();
    }

    updateUi() {
        this.crystal.text.text = player.crystals;
        this.metal.text.text = player.metal;
        this.fuel.text.text = player.fuel;
        
        this.stage.update();
    }
}

module.exports = new Renderer();