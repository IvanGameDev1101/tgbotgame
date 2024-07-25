import Phaser from 'phaser';
import GameScene from './scenes/MainScene';
import ShopScene from './scenes/ShopScene';
import AchievementsScene from './scenes/AchievementsScene';
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [GameScene, ShopScene, AchievementsScene],
    parent: 'game-container',
};
new Phaser.Game(config);
//# sourceMappingURL=main.js.map