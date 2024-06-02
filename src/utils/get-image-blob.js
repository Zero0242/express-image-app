/**
 * Descarga una imagen y la retorna como un blob
 * @param {string} url 
 * @returns {Promise<Blob>}
 */
const downloadBlobFromUrl = async (url) => {
    const resp = await fetch(url)
    const blob = await resp.blob()
    return blob;
}

module.exports = downloadBlobFromUrl