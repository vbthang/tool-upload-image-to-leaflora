'use strict'

const app = require('./src/app')

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server running on port http:\\\\localhost:${PORT}`);
})

process.on('SIGINT', () => {
    console.log(`\nServer stopped.`)
    process.exit()
})