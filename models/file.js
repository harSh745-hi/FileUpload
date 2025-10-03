const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const fileSchema = new mongoose.Schema({
  
    name : {
        type :String,
        required:true,
    },
    imageUrl :{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String,
    }


})

// post middlewawre 

fileSchema.post("save", async function (doc) {
    try {
        console.log("doc",doc);

        // transpoter 
        let transpoter  = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user : process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
        })

        // sending mail 

        let info =  await  transpoter.sendMail({
            from:`HARRY `,
            to :doc.email,
            subject:"file uploaded succesfully",
            html:`<h1> file uploaded</h1> <p>View here </p>: <a href="${doc.imageUrl}">${doc.imageUrl}</a>`
        })
        console.log("INFO",info);

    } catch (error) {

        console.error(error);
        
        
    }
})

// exporting 
const File = mongoose.model("File",fileSchema);
module.exports = File;
