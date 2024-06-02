const { v4: uuid } = require('uuid')
const fs = require('fs')

/**
 * Guarda un archivo en filesystem
 * @param {Buffer} buffer 
 */
const saveFileToFS = (buffer) => {
    fs.mkdirSync('./results', { recursive: true })
    fs.writeFileSync(`./results/${uuid()}.png`, buffer)
}

module.exports = saveFileToFS