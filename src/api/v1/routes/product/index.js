'use strict'

const express = require('express')
const mysql = require('mysql2')
const multer = require('multer')
const productController = require('../../controllers/product.controller')
const asyncHandler = require('../../helper/asyncHandler')

const router = express.Router()

const upload = multer({ dest: 'uploads/'})

router.post('/upload', upload.array('detailImages[]', 10), asyncHandler(productController.upload))

router.get('/getall', async (req, res) => {
    const con = await mysql.createConnection({
        "host": "34.145.53.182",
        "user": "root",
        "password": "",
        "database": "leaflora_data"
    })
    const query = 'DESC test'
    // con.query('INSERT INTO test VALUES ("i", "j")')
    con.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error)
            res.status(500).json({ message: 'Error fetching data' });
        } else if (!results.length) {
            res.json({ status: "Not found" })
        } else {
            res.json({ status: "OK", msg: results })
        }
    })
})

router.get('', productController.index)

module.exports = router