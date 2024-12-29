const busboy = require("busboy");
const parseHelper = require("../helpers/response_helper");
const {saveFileToCloudinary, saveFileLocally} = require("../helpers/file_helpers");

const MAX_FILE_SIZE = process.env.MAX_FILE_SIZE * 1024 * 1024 || 5 * 1024 * 1024;

const bus = (req, res, next) => {
    try {
        if (!req.is('multipart/form-data')) {
            return next()
        }
        const bb = busboy({headers: req.headers});
        // Initialize arrays to store file data and form fields
        req.body.files = [];
        // Handle file upload
        bb.on('file', (fieldName, file, info) => {
            const {filename, mimeType} = info;
            if (!mimeType.startsWith('image/')) {
                throw new Error(`fileTypeNotAllowed`);
            }

            let bytesReceived = 0;

            file.on('data', (data) => {
                bytesReceived += data.length;
                if (bytesReceived > MAX_FILE_SIZE) {
                    file.resume();
                    throw new Error(`fileSizeNotAllowed`);
                }
            });
            saveFileLocally(file, filename).catch((err) => {
                console.log(err)
            })
            // Store file information in the req.body.uploadedFiles array
            file.on('end', () => {
                req.body.files.push({
                    file: file,
                    fieldName: fieldName,
                    fileName: filename,
                    mimeType: mimeType,
                });
            });
        });

        // Handle other form fields (like text input, etc.)
        bb.on('field', (name, value) => {
            req.body[name] = value; // Move form fields to req.body
        });

        bb.on('finish', () => {
            next();
        });

        req.pipe(bb);


    } catch (err) {
        if (err.message === `fileSizeNotAllowed`)
            parseHelper(res, 403, null, `maximum file size is ${MAX_FILE_SIZE} MB`);
        if (err.message === `fileTypeNotAllowed`)
            parseHelper(res, 403, null, `only images can be uploaded`);
    }
};


module.exports = {bus};
