require('dotenv').config()
const env = require('env-var');
// Read in a port (checks that PORT is in the range 0 to 65535)
// Alternatively, use a default value of 5432 if PORT is not defined
module.exports = {
    PORT: env.get('PORT').default('5432').asPortNumber(),
    MB_LIMIT: 1024 * 1000 * 30

}