import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const env = loadEnv(mode, '.', '');
    return {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
