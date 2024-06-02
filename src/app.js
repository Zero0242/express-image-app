const { PORT } = require('./config')
const { removeBackground } = require("@imgly/background-removal-node");
const downloadBlobFromUrl = require('./utils/get-image-blob.js')
const express = require('express')
const fileToBase64 = require('./utils/png-to-base64.js')
const fileupload = require("express-fileupload");
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use(fileupload())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(`${process.cwd()}/public/`))

app.post('/remove-bg', async (req, res) => {
    if (!req.files || !req.files.archivo) {
        return res.status(400).json({ ok: false, message: 'archivo es requerido' })
    }
    /** @type {fileupload.UploadedFile} */
    const archivo = req.files.archivo
    const url = fileToBase64(archivo.data)
    const blob = await downloadBlobFromUrl(url)
    const result = await removeBackground(blob, { output: { format: 'image/png' } })
    const buffer = Buffer.from(await result.arrayBuffer());
    res.setHeader("Content-Type", 'image/png')
    res.status(200).send(buffer)
})

app.post('/remove-url', async (req, res) => {
    try {
        const url = req.body.url
        const blob = await downloadBlobFromUrl(url)
        const result = await removeBackground(blob, { output: { format: 'image/png' } })
        const buffer = Buffer.from(await result.arrayBuffer());
        res.setHeader("Content-Type", 'image/png')
        res.status(200).send(buffer)
    } catch (error) {
        res.status(400).json({ error })
    }
})

app.listen(PORT, () => console.log(`Corriendo en puerto: ${PORT}`))