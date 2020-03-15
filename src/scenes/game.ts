import { Scene, Structs, Input, Scale, GameObjects } from 'phaser';
import { Grid, GRID_TEXTURE_KEY } from '../gameObjects/grid';

const ZOOM_LEVELS = [128, 64, 32, 16];

export class GameScene extends Scene {
    private grid: Grid;
    private zoomLevel: integer;

    create() {
        this.zoomLevel = 1;
        this.grid = new Grid(this, this.scale.width, this.scale.height, ZOOM_LEVELS[this.zoomLevel]);
        this.scale.on(Scale.Events.RESIZE, this.resize, this);
        this.input.on(Input.Events.POINTER_WHEEL, this.onMouseWheel, this);
    }

    resize(gameSize: Structs.Size) {
        this.grid.resize(gameSize.width, gameSize.height);
    }

    onMouseWheel(pointer: Input.Pointer, currentlyOver: GameObjects.GameObject[], deltaX: number, deltaY: number, deltaZ: number) {
        if((this.onMouseWheel as any).locked) {
            return;
        }
        (this.onMouseWheel as any).locked = true;
        setTimeout(() => (this.onMouseWheel as any).locked = false, 100);

        if(deltaY < 0) {
            this.zoomLevel = Math.min(this.zoomLevel + 1, ZOOM_LEVELS.length - 1);
        } else {
            this.zoomLevel = Math.max(this.zoomLevel - 1, 0);
        }
        this.grid.setTileSize(ZOOM_LEVELS[this.zoomLevel]);
    }
}