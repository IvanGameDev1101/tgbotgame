import Phaser from '/npm/phaser@3.55.2/dist/phaser.js';
import GameScene from '/tgbotgame/dist/scenes/MainScene';
import ShopScene from '/tgbotgame/dist/scenes/ShopScene';
import AchievementsScene from '/tgbotgame/dist/scenes/AchievementsScene';
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [GameScene, ShopScene, AchievementsScene],
    parent: 'game-container',
};
new Phaser.Game(config);
//# sourceMappingURL=main.js.map