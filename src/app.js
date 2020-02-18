/*eslint no-undef: "off"*/
/*eslint no-unused-vars: "off"*/

/* Application Requirements */
const express = require('express')
const app = express()
const addRequestId = require('express-request-id')()
const morgan = require('morgan')
const index = require('./routes/index')
const gitlab = require('./routes/gitlab')
const path = require('path')

/* Config Loading Requirements */
const _ = require('lodash')

const envconfig = {};
_.each(process.env, (value, key) => {
    if (key.includes("MRDASH")) {
        const keys = key.toLowerCase().split('_');
        let key_count = keys.length
        let config_layers = 2
        let keys_limit = key_count - config_layers
        let current = envconfig;
        let currentKey;
        while ((currentKey = keys.shift())) {
            if (keys.length >= keys_limit) {
                if (!current[currentKey]) {
                    current[currentKey] = {};
                }
                current = current[currentKey];
            } else {

                if (keys.length > 0) {
                    joined = currentKey + "_" + keys.join("_")
                    current[joined] = process.env[key]
                }

                if (key_count == config_layers + 1 && !keys.length) {
                    current[currentKey] = process.env[key]
                }
            }
        }
    }
});


const config = require('./config/app.json')
const configFromEnv = envconfig["mrdash"]
const mergedConfig = _.merge(config, configFromEnv)
const environment = process.env.NODE_ENV || 'dev'
const environmentConfig = mergedConfig[environment]
const finalConfig = environmentConfig
global.gConfig = finalConfig

console.debug("Config From Environment: " + JSON.stringify(configFromEnv, undefined, 4))

/* Setup Morgen use tokens */
morgan.token('id', function getId(req) {
    return req.id
});

/* Logger Setup */
var loggerFormat = ':id [:date[web]]" ~ :method :url" :status ~ :response-time ms ~ :remote-addr';

/* App Setup */
app.use(addRequestId)
app.set('view engine', 'pug')
app.use(morgan(loggerFormat, {
    skip: function(req, res) {
        return res.statusCode < 400
    },
    stream: process.stderr
}))
app.use(morgan(loggerFormat, {
    skip: function(req, res) {
        return res.statusCode >= 400
    },
    stream: process.stdout
}))

/* Configured Routes */
app.use('/', index);
app.use('/gitlab/', gitlab)
app.use("/public", express.static(path.join(__dirname, 'public')))

module.exports = app