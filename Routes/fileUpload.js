const express = require('express');
const router = express.Router();

// importing the controller of upload file
const {localFileUpload, imageUpload, videoUpload, imageSizeReducer} = require('../Controllers/uploadFiles');


// api route
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeReducer", imageSizeReducer)

module.exports = router;