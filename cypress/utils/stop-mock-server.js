const { stop } = require("./mock-server");

(function () {
  console.info("Stopping mock server...");
  stop();
})();
