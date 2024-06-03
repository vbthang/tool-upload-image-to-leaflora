'use strict'

const { Storage } = require('@google-cloud/storage');
const { BadRequestError } = require('../core/error.response');
const path = require('path')
const slugify = require('slugify')

class ProductService {
    static async upload ({
        files,
        title,
        folder
    }) {
        // SETUP CLOUD STORAGE
        const storage = new Storage({ keyFilename: process.env.GCS_KEY })
        const gcs = storage.bucket(process.env.GCS_BUCKET_NAME)
        const storagepath = `${process.env.GCS_FOLDER_ROOT}/${folder}`
        const uploadedFiles = []

        let index = 0
        for (const file of files) {
            const slugify_name = slugify(title, {
                replacement: '-',  // replace spaces with replacement character, defaults to `-`
                remove: /[*+~.()'"!:@]/g,
                lower: true,      // convert to lower case, defaults to `false`
                strict: true,     // strip special characters except replacement, defaults to `false`
                locale: 'vi',      // language code of the locale to use
                trim: true         // trim leading and trailing replacement chars, defaults to `true`
              })
            index += 1
            const fileExtension = path.extname(file.originalname)
            const fileName = `${storagepath}\/${slugify_name}_${index}${fileExtension}`
            try {
                const result = await gcs.upload(file.path, {
                    destination: fileName,
                    metadata: {
                        contentType: file.mimetype,
                    }
                });

                if (!result[0].metadata.mediaLink) throw new BadRequestError('Failed to upload');

                uploadedFiles.push({
                    link: `${process.env.GCS_LINK}${fileName}`
                });

                console.log(result);
            } catch (error) {
                console.error('Error uploading file:', error)
                throw new BadRequestError('Failed to upload')
            }
        }

        return {
            files: uploadedFiles
        }
    }
}

module.exports = ProductService