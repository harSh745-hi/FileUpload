// app create 

const express = require ('express');
const app = express();
// port 

require("dotenv").config();

PORT = process.env.PORT || 5000 ;


// middleware 
app.use(express.json());
const fileupload = require("express-fileupload");

app.use(fileupload({
  useTempFiles: true,         
  tempFileDir: '/tmp/'        
}));

// db connect 
const db = require("./config/database");
db.connect();
// cloud connect 
const cloudinary = require("./config/cloudinery");

cloudinary.cloudinaryConnect();
// api route /
const upload = require("./routes/fileUpload");
app.use("/api/v1/upload",upload);
// activate server 


app.listen( PORT , () => {
    console.log(`App is running on ${PORT}`);
})




