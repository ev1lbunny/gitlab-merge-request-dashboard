/*eslint no-unused-vars: "warn" */

const gitlab = require('gitlab/dist/es5').default

const api = new gitlab({
    url:   'https://git.nonprod.williamhill.plc',
    token: 'z7zE4hsPaYUoo7VnkBVM',
    rejectUnauthorized: false
  })

api.Projects.all()

module.exports = gitlab