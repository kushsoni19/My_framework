import { defineConfig } from 'cypress';
import setupNodeEvents from './cypress/plugins/index.cjs';

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 10000,
  e2e: {
    setupNodeEvents,
    baseUrl: 'http://localhost:8080',
  },
});
