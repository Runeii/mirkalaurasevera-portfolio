import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) { },
    supportFile: false,
    specPattern: '**/*.e2e.ts',
  },
})