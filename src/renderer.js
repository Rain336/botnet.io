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
        this.map = {}
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
    }

    updateUi() {
        this.crystal.text.text = player.crystals;
        this.metal.text.text = player.metal;
        this.fuel.text.text = player.fuel;
    }

    move(id, x, y) {
        const entity = this.map[id];
        createjs.Tween.get(entity).to({ x: x, y: y });
        entity.text.update(x, y);
    }

    addBase(base) {
        this.bases.push(base);
        this.map[base.id] = base;
    }

    addBot(bot) {
        this.bots.push(bot);
        this.map[bot.id] = bot;
    }

    addResource(resource) {
        this.resources.push(resource);
        this.map[resource.id] = resource;
    }
}

module.exports = new Renderer();