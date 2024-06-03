'use strict'

const { SuccessResponse } = require("../core/success.response")
const ProductService = require("../services/product.service")

class ProductController {
    upload = async (req, res, next) => {
        const files = req.files;
        const { title, folder } = req.body
        console.log(`Title : ${title}, Folder : ${folder}`)

        new SuccessResponse({
            message: 'Upload new product to google storage successfully!',
            metadata: await ProductService.upload({
                files: files,
                title: title,
                folder: folder
            })
        }).send(res)
    }

    index = async (req, res, next) => {
        res.render('home')
    }
}

module.exports = new ProductController()