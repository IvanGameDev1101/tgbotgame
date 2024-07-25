import Phaser from './node_modules/phaser/dist/phaser.js';
export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.clicks = 0;
        this.score = 10000;
        this.clickValue = 1;
        this.passiveIncome = 0;
    }
    init(data) {
        if (data.score !== undefined)
            this.score = data.score;
        if (data.clicks !== undefined)
            this.clicks = data.clicks;
        if (data.clickValue !== undefined)
            this.clickValue = data.clickValue;
        if (data.passiveIncome !== undefined)
            this.passiveIncome = data.passiveIncome;
        const tg = window.Telegram.WebApp;
        tg.onEvent('main_button_clicked', () => {
            // Обработка нажатия основной кнопки
            console.log("Main button clicked");
        });
    }
    preload() {
        // Загрузка ресурсов
    }
    create() {
        this.add.text(100, 50, 'Clicker Game', { fontSize: '32px', color: '#fff' });
        this.scoreText = this.add.text(100, 100, `Score: ${this.score}`, { fontSize: '24px', color: '#fff' });
        this.clickValueText = this.add.text(100, 140, `Click Value: ${this.clickValue}`, { fontSize: '24px', color: '#fff' });
        this.passiveIncomeText = this.add.text(100, 180, `Passive Income: ${this.passiveIncome}/sec`, { fontSize: '24px', color: '#fff' });
        const clickButton = this.add.text(100, 220, 'Click me!', { fontSize: '24px', color: '#fff', backgroundColor: '#000' })
            .setInteractive()
            .on('pointerdown', () => {
            this.score += this.clickValue;
            this.clicks++;
            this.updateScore();
        });
        const shopButton = this.add.text(100, 260, 'Go to Shop', { fontSize: '24px', color: '#fff', backgroundColor: '#000' })
            .setInteractive()
            .on('pointerdown', () => {
            this.scene.start('ShopScene', { score: this.score, clickValue: this.clickValue, passiveIncome: this.passiveIncome });
        });
        const achievementsButton = this.add.text(100, 300, 'Go to Achievements', { fontSize: '24px', color: '#fff', backgroundColor: '#000' })
            .setInteractive()
            .on('pointerdown', () => {
            this.scene.start('AchievementsScene', { clicks: this.clicks, score: this.score });
        });
        this.time.addEvent({
            delay: 1000,
            callback: this.addPassiveIncome,
            callbackScope: this,
            loop: true
        });
    }
    updateScore() {
        this.scoreText.setText(`Score: ${this.score}`);
        this.clickValueText.setText(`Click Value: ${this.clickValue}`);
        this.passiveIncomeText.setText(`Passive Income: ${this.passiveIncome}/sec`);
    }
    addPassiveIncome() {
        this.score += this.passiveIncome;
        this.updateScore();
    }
}
//# sourceMappingURL=MainScene.js.map