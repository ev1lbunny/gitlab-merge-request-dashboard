/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */

const app = require('./app')

app.listen(global.gConfig.port, () => {
  console.log(`Configured from: ${global.gConfig.config_id} configuration`)
  console.debug(`Full Config: ${JSON.stringify(global.gConfig, undefined, 4)}`)
  console.log(`Express App running → PORT ${global.gConfig.port}`)
});
