import { defineConfig } from "cypress";
require('dotenv').config()
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    auth0_username: "test1",
    auth0_password: "Test1234$",
    auth0_domain: "dev-mujh303ammb4fy01.uk.auth0.com",
    auth0_audience: "https://amaze-thing-dev.com",
    auth0_client_id: "O94ycBixGyrF1fRoyebadt9aJf7MzyRA",
    auth0_client_secret: "H3febBUZXNSsGbUXguJpU4SAlafEBR3oxH_8niIcGKmUg6q78_ZqBvwTJRhvCDVZ"
  }
});
