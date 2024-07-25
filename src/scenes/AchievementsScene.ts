import Phaser from 'phaser';

export default class AchievementsScene extends Phaser.Scene {
    private clicks!: number;
    private score!: number;
    private achievements: { name: string, condition: number, reward: number, claimed: boolean }[];
    private clicksText!: Phaser.GameObjects.Text;

    constructor() {
        super({ key: 'AchievementsScene' });
        this.achievements = [
            { name: '100 Clicks', condition: 100, reward: 10, claimed: false },
            { name: '1000 Clicks', condition: 1000, reward: 50, claimed: false },
            { name: '5000 Clicks', condition: 5000, reward: 100, claimed: false }
        ];
    }

    init(data: any) {
        this.clicks = data.clicks;
        this.score = data.score;
        this.checkAchievements();
    }

    create() {
        this.add.text(100, 50, 'Achievements', { fontSize: '32px', color: '#fff' });
        this.clicksText = this.add.text(100, 100, `clicks: ${this.clicks}`, { fontSize: '24px', color: '#fff' });

        this.achievements.forEach((achievement, index) => {
            const achievementText = this.add.text(100, 150 + index * 40, `${achievement.name} - Reward: ${achievement.reward}`, { fontSize: '24px', color: '#fff' });

            const claimButton = this.add.text(400, 150 + index * 40, 'Claim Reward', { fontSize: '24px', color: '#fff', backgroundColor: '#000' })
                .setInteractive()
                .on('pointerdown', () => {
                    if (!achievement.claimed && this.clicks >= achievement.condition) {
                        this.score += achievement.reward;
                        achievement.claimed = true;
                        claimButton.setInteractive(false);
                        claimButton.setStyle({ backgroundColor: '#555' });
                    }
                });

            if (achievement.claimed || this.clicks < achievement.condition) {
                claimButton.setInteractive(false);
                claimButton.setStyle({ backgroundColor: '#555' });
            }
        });

        const backButton = this.add.text(100, 300, 'Back to Main', { fontSize: '24px', color: '#fff', backgroundColor: '#000' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('MainScene', { score: this.score });
            });
    }

    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (this.clicks >= achievement.condition && !achievement.claimed) {
                // Достижение выполнено, но награда еще не забрана
            }
        });
    }
}
