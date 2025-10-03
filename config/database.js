const mongoose =  require('mongoose');

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.DB_URL)
    .then(console.log("DB connection successfully"))
    .catch( (err) => {
        console.log("DB connection issues");
        console.error(err);
        process.exit(1);
    })
}