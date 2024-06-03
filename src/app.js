'use strict'

require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('dev'))

app.set('views', './src/api/v1/views/')
app.set('view engine', 'ejs')

app.use('/api/v1', require('./api/v1/routes'))

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})
  
app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error'
    })
})

module.exports = app