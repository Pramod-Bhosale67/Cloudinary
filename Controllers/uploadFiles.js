const File = require('../Modules/file');

const cloudinary = require('cloudinary').v2

// local file upload handler
exports.localFileUpload = (req, res) => {
    try{
        // fetch the file -> file in files.file is a name of file(it can be anything)
        const file = req.files.file;
        console.log("Files: ", file);

        // path where you want to upload the file to your local server. This is the server path
        // --dirname -> mainly showcase the current working dir
        // .${file.name.split('.')[1]} is the extraction of extension
        const path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("path: ", path);

        // move the file in the given path
        file.mv(path, (error) => {
            console.error(error);
            console.log(error);
        })

        // success response
        res.json({
            success: true,
            message: "Local file uploaded successfully",
        })
    }catch(error){
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedFiles){
    return supportedFiles.includes(type);
}

async function uploadToCloudinary(file, folder, quality){
    const option = {folder};
    option.resource_type = "auto"

    if (quality){
        option.quality = quality;
    }

    console.log("imageFile function :", file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath, option);    
}

// uploading the image on the cloudinary
exports.imageUpload = async(req, res) => {

    try{
        // fetch the data from the request body
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        // to receive the file
        const imageFile = req.files.imageFile;
        console.log("file: ", imageFile);

        // file validation for the extension
        const supportedFiles = ["png", "jpg", "jpeg"];

        // get the extension of the uploading image for validation
        const fileType = imageFile.name.split('.')[1].toLowerCase();
        console.log("file type: ", fileType);

        if (!isFileTypeSupported(fileType, supportedFiles)){
            res.status(400).json({
                success:false,
                message: "File format is not supported"
            })
        }

        // since file format is supported, now upload it to the cloudinary
        // file -> the one which u want to upload on the cloudianry
        // CodeHelp is the folder you have created on the cloudinary
        const response = await uploadToCloudinary(imageFile, "CodeHelp");
        console.log("response: -> ", response);

        // entry in the database
        const fileData = await File.create ({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        res.json({
            success:true,
            imgUrl: response.secure_url,
            message: "File uploaded successfully"
        })

    }catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message: "Something wrong"
        })
    }
}

exports.videoUpload = async(req, res) => {
    try{

         // fetch the data from the request body
        const {name, tags, email} = req.body;
        console.log(name,tags, email);

        //  fetch the file you want to upload
        const videoFile = req.files.videoFile;

        // file validation for the extension
        const supportedFiles = ["mp4", "mov"];

        // get the extension of the uploading image for validation
        const fileType = videoFile.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedFiles)){
            res.status(400).json({
                success:false,
                message: "File format is not supported"
            })
        }

        // since file format is supported, now upload it to the cloudinary
        // file -> the one which u want to upload on the cloudianry
        // CodeHelp is the folder you have created on the cloudinary
        const response = await uploadToCloudinary(videoFile, "Codehelp");
        console.log("response: ", response);

         // entry in the database
         const fileData = await File.create ({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        res.json({
            success:true,
            message: "Video uploaded successfully"
        })

    }catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message: "Something wrong"
        })
    }
}

exports.imageSizeReducer = async(req, res) => {
    try{
        // fetch the data from the request body
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        // to receive the file
        const imageFile = req.files.imageFile;
        console.log("file: ", imageFile);

        // file validation for the extension
        const supportedFiles = ["png", "jpg", "jpeg"];

        // get the extension of the uploading image for validation
        const fileType = imageFile.name.split('.')[1].toLowerCase();
        console.log("file type: ", fileType);

        if (!isFileTypeSupported(fileType, supportedFiles)){
            res.status(400).json({
                success:false,
                message: "File format is not supported"
            })
        }

        // since file format is supported, now upload it to the cloudinary
        // file -> the one which u want to upload on the cloudianry
        // CodeHelp is the folder you have created on the cloudinary
        const response = await uploadToCloudinary(imageFile, "CodeHelp", 30);
        console.log("response: -> ", response);

        // entry in the database
        const fileData = await File.create ({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        res.json({
            success:true,
            imgUrl: response.secure_url,
            message: "File uploaded successfully"
        })

    }catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message: "Something wrong"
        })
    }
}