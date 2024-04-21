const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

// middleware
app.use(express.json());

// importing the file upload
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


// connecting to the DB
const dbConnect = require('./Config/database');
dbConnect.dbConnect();

// connecting to the cloudinary
const cloudinary = require('./Config/cloundinary');
cloudinary.cloudinaryConnect();


// importing routes
const upload = require('./Routes/fileUpload');

// mounting the routes
app.use("/api/v1/upload", upload);

// active the server
app.listen(PORT, () => {
    console.log(`Server is active on PORT ${PORT}`);
})
 