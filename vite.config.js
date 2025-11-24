import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
    server: {
        proxy: {
            '/test': {
                target: 'http://localhost:8081',
                xfwd: true,
                secure: false,
            },
        },
    },
    plugins: [
        basicSsl(),
    ],
});
