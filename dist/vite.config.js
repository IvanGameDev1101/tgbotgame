import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    base: '/tgbotgame/', // Замените 'repo-name' на имя вашего репозитория
    build: {
        outDir: 'dist'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            'phaser': path.resolve(__dirname, 'node_modules/phaser/dist/phaser.js')
        }
    }
});
//# sourceMappingURL=vite.config.js.map
