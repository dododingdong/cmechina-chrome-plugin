import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    permissions: ['storage', 'tabs'],
    web_accessible_resources: [
      {
        resources: ["injected.js"],
        matches: ['https://www.cmechina.net/*'],
      },
    ],
  },
});
