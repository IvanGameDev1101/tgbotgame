import Phaser from './node_modules/phaser/dist/phaser.js';
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