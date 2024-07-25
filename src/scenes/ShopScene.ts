import Phaser from 'phaser';
import TonService from '../service/TonService';

export default class ShopScene extends Phaser.Scene {
    private score!: number;
    private clickValue!: number;
    private passiveIncome!: number;
    private scoreText!: Phaser.GameObjects.Text;
    private clickUpgradeCost1: number;
    private clickUpgradeCost10: number;
    private passiveIncomeUpgradeCost1: number;
    private passiveIncomeUpgradeCost10: number;
    private clickUpgradeButton1!: Phaser.GameObjects.Text;
    private clickUpgradeButton10!: Phaser.GameObjects.Text;
    private clickUpgradeButton100!: Phaser.GameObjects.Text;
    private passiveIncomeUpgradeButton1!: Phaser.GameObjects.Text;
    private passiveIncomeUpgradeButton10!: Phaser.GameObjects.Text;
    private passiveIncomeUpgradeButton100!: Phaser.GameObjects.Text;

    constructor() {
        super({ key: 'ShopScene' });
        this.clickUpgradeCost1 = 10;
        this.clickUpgradeCost10 = 1000;
        this.passiveIncomeUpgradeCost1 = 50;
        this.passiveIncomeUpgradeCost10 = 5000;
    }

    init(data: any) {
        this.score = data.score;
        this.clickValue = data.clickValue;
        this.passiveIncome = data.passiveIncome;
    }

    async create() {
        const tonService = TonService.getInstance();
        await tonService.connectWallet();

        this.scoreText = this.add.text(100, 100, `Score: ${this.score}`, { fontSize: '24px', color: '#fff' });

        this.clickUpgradeButton1 = this.add.text(100, 140, `Upgrade Click Value (+1 per click) (Cost: ${this.clickUpgradeCost1})`, { fontSize: '16px', color: '#fff', backgroundColor: '#000' })
            .setInteractive()
            .on('pointerdown', () => {
                if (this.score >= this.clickUpgradeCost1) {
                    this.score -= this.clickUpgradeCost1;
                    this.clickValue += 1;
                    this.clickUpgradeCost1 = Math.floor(this.clickUpgradeCost1 * 1.5);
                    this.updateShop();
                }
            });
        
        this.clickUpgradeButton10 = this.add.text(100, 170, `Upgrade Click Value (+10 per click) (Cost: ${this.clickUpgradeCost10})`, { fontSize: '16px', color: '#fff', backgroundColor: '#000' })
            .setInteractive()
            .on('pointerdown', () => {
                if (this.score >= this.clickUpgradeCost10) {
                    this.score -= this.clickUpgradeCost10;
                    this.clickValue += 10;
                    this.clickUpgradeCost10 = Math.floor(this.clickUpgradeCost10 * 1.5);
                    this.updateShop();
                }
            });
        
        this.clickUpgradeButton100 = this.add.text(100, 200, `Upgrade Click Value (+100 per click) (Cost: 0.1 TON)`, { fontSize: '16px', color: '#fff', backgroundColor: '#000' })
            .setInteractive()
            .on('pointerdown', async () => {
                try {
                    await tonService.sendTransaction('ВАШ АДРЕС КОШЕЛЬКА', '0.1');
                    this.clickValue += 100;
                    this.updateShop();
                } catch (error) {
                    console.error('Transaction failed', error);
                }
            });

        this.passiveIncomeUpgradeButton1 = this.add.text(100, 230, `Upgrade Passive Income (+1 per second) (Cost: ${this.passiveIncomeUpgradeCost1})`, { fontSize: '16px', color: '#fff', backgroundColor: '#000' })
            .setInteractive()
            .on('pointerdown', () => {
                if (this.score >= this.passiveIncomeUpgradeCost1) {
                    this.score -= this.passiveIncomeUpgradeCost1;
                    this.passiveIncome += 1;
                    this.passiveIncomeUpgradeCost1 = Math.floor(this.passiveIncomeUpgradeCost1 * 1.5);
                    this.updateShop();
                }
            });
        
        this.passiveIncomeUpgradeButton10 = this.add.text(100, 260, `Upgrade Passive Income (+10 per second) (Cost: ${this.passiveIncomeUpgradeCost10})`, { fontSize: '16px', color: '#fff', backgroundColor: '#000' })
            .setInteractive()
            .on('pointerdown', () => {
                if (this.score >= this.passiveIncomeUpgradeCost10) {
                    this.score -= this.passiveIncomeUpgradeCost10;
                    this.passiveIncome += 10;
                    this.passiveIncomeUpgradeCost10 = Math.floor(this.passiveIncomeUpgradeCost10 * 1.5);
                    this.updateShop();
                }
            });
        
        this.passiveIncomeUpgradeButton100 = this.add.text(100, 290, `Upgrade Passive Income (+100 per second) (Cost: 0.1 TON)`, { fontSize: '16px', color: '#fff', backgroundColor: '#000' })
            .setInteractive()
            .on('pointerdown', async () => {
                try {
                    await tonService.sendTransaction('ВАШ АДРЕС КОШЕЛЬКА', '0.1');
                    this.passiveIncome += 100;
                    this.updateShop();
                } catch (error) {
                    console.error('Transaction failed', error);
                }
            });

        const backButton = this.add.text(100, 350, 'Back to Main', { fontSize: '24px', color: '#fff', backgroundColor: '#000' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('MainScene', { score: this.score, clickValue: this.clickValue, passiveIncome: this.passiveIncome });
            });

        this.time.addEvent({
            delay: 1000,
            callback: this.addPassiveIncome,
            callbackScope: this,
            loop: true
        });
    }

    updateShop() {
        this.scoreText.setText(`Score: ${this.score}`);
        this.clickUpgradeButton1.setText(`Upgrade Click Value (+1 per click) (Cost: ${this.clickUpgradeCost1})`);
        this.clickUpgradeButton10.setText(`Upgrade Click Value (+10 per click) (Cost: ${this.clickUpgradeCost10})`);
        this.clickUpgradeButton100.setText(`Upgrade Click Value (+100 per click) (Cost: 0.1 TON)`);
        this.passiveIncomeUpgradeButton1.setText(`Upgrade Passive Income (+1 per second) (Cost: ${this.passiveIncomeUpgradeCost1})`);
        this.passiveIncomeUpgradeButton10.setText(`Upgrade Passive Income (+10 per second) (Cost: ${this.passiveIncomeUpgradeCost10})`);
        this.passiveIncomeUpgradeButton100.setText(`Upgrade Passive Income (+100 per second) (Cost: 0.1 TON)`);
    }

    addPassiveIncome() {
        this.score += this.passiveIncome;
        this.updateScore();
    }

    updateScore() {
        this.scoreText.setText(`Score: ${this.score}`);
    }
}
