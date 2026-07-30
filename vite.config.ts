/* eslint-disable import/no-default-export, import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react-swc';
import { UserConfig, defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default (): UserConfig =>
  defineConfig({
    root: './src',
    envDir: '../',
    publicDir: '../public',
    build: {
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [react(), tsconfigPaths()],
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
    server: { port: 3001 },
  });
