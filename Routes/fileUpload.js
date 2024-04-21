const express = require('express');
const router = express.Router();

// importing the controller of upload file
const {localFileUpload} = require('../Controllers/uploadFiles');

// api route
router.post("/localFileUpload", localFileUpload);

module.exports = router;