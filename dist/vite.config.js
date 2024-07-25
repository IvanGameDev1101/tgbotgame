import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
    plugins: [vue()],
    base: '/',
    resolve: {
        alias: {
            '@': '/src',
            phaser: 'phaser/dist/phaser.js',
        },
    },
    server: {
        host: '0.0.0.0',
        port: 3000,
    },
});
//# sourceMappingURL=vite.config.js.map