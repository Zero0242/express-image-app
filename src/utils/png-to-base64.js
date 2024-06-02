/**
 * Transforma el buffer en un url en base64
 * @param {Buffer} data 
 * @returns {string}
 */
const fileToBase64 = (data) => {
    const base64 = Buffer.from(data).toString('base64');
    return `data:image/png;base64,${base64}`;
}

module.exports = fileToBase64