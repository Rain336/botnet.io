import { Game, AUTO, Scale } from 'phaser';
import { GameScene } from './scenes/game';

const game = new Game({
    type: AUTO,
    backgroundColor: 0x1F1F1F,
    scale: {
        mode: Scale.RESIZE,
        width: '100%',
        height: '100%'
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 200
            }
        }
    },
    scene: [
        GameScene
    ]
});