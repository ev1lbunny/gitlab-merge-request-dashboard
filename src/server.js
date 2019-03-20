/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */

const app = require('./app')

var port = 7000

app.listen(port, () => {
  console.log(`Express App running → PORT ${port}`)
});
