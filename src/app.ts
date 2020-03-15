import { Game, AUTO } from 'phaser';
import { GameScene } from './scenes/game';

const game = new Game({
    type: AUTO,
    width: 1280,
    height: 720,
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