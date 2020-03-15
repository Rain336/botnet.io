import { Scene } from 'phaser';

export class GameScene extends Scene {
    create() {
        this.add.rectangle(1280 / 2, 736 / 2, 1280, 736, 0x1F1F1F);
        for(let i = 0; i <= 1280; i += 32) {
            this.add.rectangle(i, 736 / 2, 8, 736, 0x4F76A1);
        }
        for(let i = 0; i <= 736; i += 32) {
            this.add.rectangle(1280 / 2, i, 1280, 8, 0x4F76A1);
        }
    }
}