import { defineConfig } from "cypress";
import setupNodeEvents from "./cypress/plugins";

export default defineConfig({
  projectId: "1c35bs",
  retries: {
    runMode: 0,
    openMode: 0,
  },
  chromeWebSecurity: false,
  e2e: {
    video: false,
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents,
    baseUrl: "http://localhost:8080",
    specPattern: "cypress/e2e/*spec*.js",
  },
});
