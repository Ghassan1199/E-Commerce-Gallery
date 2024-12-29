const fs = require("fs");
const path = require("path");
const uploadPath = path.join(process.cwd(), 'storage', 'images'); // Where images will be stored
const {v2} = require("cloudinary");
const cloudinary = v2
// Configuration
cloudinary.config({
    cloud_name: process.env.ClOUDINARY_CLOUD_NAME,
    api_key: process.env.ClOUDINARY_API_KEY,
    api_secret: process.env.ClOUDINARY_SECRET_KEY,
});

const saveFileLocally = async (file, file_name) => {
    try {
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, {recursive: true}); // Create the directory and all parent directories
        }
        const saveTo = path.join(uploadPath, file_name);
        await file.pipe(fs.createWriteStream(saveTo));
        return saveTo;
    } catch (err) {
        console.log(err);
    }

}


const saveFileToCloudinary = async (file_path) => {
    const uploadResult = await cloudinary.uploader.upload(file_path, {
        folder: "AboMariam",
        transformation: [
            {quality: "auto"},
            {fetch_format: "auto"}
        ]
    });
    return uploadResult.url;

}


const deleteFileFromCloudinary = async (public_id) => {
    const result = await cloudinary.api.delete_resources(extractPublicId(public_id));
    console.log(result);
}


function extractPublicId(url) {
    const start = url.indexOf("AboMariam");
    const end = url.indexOf(".jpg");

    if (start !== -1 && end !== -1) {
        return url.slice(start, end);
    }
    return null;
}

module.exports = {
    saveFileLocally,
    saveFileToCloudinary,
    deleteFileFromCloudinary,
    uploadPath,
}