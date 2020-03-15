import { GameObjects, Scene } from "phaser";

export const GRID_TEXTURE_KEY = 'grid';

export class Grid {
    private tileSize: integer;
    private scene: Scene;
    private g: GameObjects.Graphics;

    private width: integer;
    private tileWidth: integer;
    private height: integer;
    private tileHeight: integer;

    constructor(scene: Scene, width: integer, height: integer, tileSize: integer) {
        this.tileSize = tileSize;
        this.scene = scene;
        this.g = scene.add.graphics({
            x: 0,
            y: 0
        });
        this.resize(width, height);
    }

    public resize(width: integer, height: integer) {
        while (((width / 32) % 1) !== 0) {
            width++;
        }
        this.width = width;
        this.tileWidth = width / 32;

        while (((height / 32) % 1) !== 0) {
            height++;
        }
        this.height = height;
        this.tileHeight = height;

        this.draw();
    }

    public invalidate() {
        this.draw();
    }

    public setTileSize(tileSize: integer) {
        this.tileSize = tileSize;
        this.invalidate();
    }

    private draw() {
        this.g.fillStyle(0x1F1F1F);
        this.g.fillRect(0, 0, this.width, this.height);
        this.g.fillStyle(0x4F76A1);
        for (let i = -4; i <= this.width; i += this.tileSize) {
            this.g.fillRect(i, 0, 8, this.height);
        }
        for (let i = -4; i <= this.height; i += this.tileSize) {
            this.g.fillRect(0, i, this.width, 8);
        }
    }
}