const File = require('../Modules/file');

// local file upload handler
exports.localFileUpload = (req, res) => {
    try{
        // fetch the file
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