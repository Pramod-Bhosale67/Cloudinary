const mongoose = require('mongoose');

require('dotenv').config();

// connecting to the mongo DB
exports.dbConnect = () => {
    mongoose.connect(process.env.DB_URL, {})
    .then(() => {console.log("DB Connected Successfully")})
    .catch((error) => {
        console.error(error);
        console.log(error);
        process.exit(1);
    })
}





