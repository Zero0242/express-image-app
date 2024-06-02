function errorHandler() {
    return (err, req, res, next) => {
        console.error(err);
        if (err.type === 'entity.too.large') {
            const { expected, limit, type } = err
            return res.status(400).json({ error: 'Archivo demasiado grande', expected, limit, type })
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = errorHandler;