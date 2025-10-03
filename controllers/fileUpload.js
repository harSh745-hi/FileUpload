const { response } = require("express");
const File = require("../models/file");
const cloudinary = require("cloudinary");

exports.LocalFileUpload = async (req , res) => {
    try {
        
        // files fetching 

        const file = req.files.file;
        console.log(file);

        // path  

        const path = __dirname + "/files" + Date.now();
        console.log(path);

        // moves fucntion 
        file.mv(path, (err) => {
            console.log(err)
        })
        res.json({
            success:true,
            message:"File uploaded on local server"
        })
    } catch (error) {

        console.log(error);

        res.json({
            success:false,
            message:"file cannot be uploaded"
        });
        
    }
}


function isFileTypeSupport(type,supportType) {
    return supportType.includes(type);
}

async function uploadCloudinary (file,quality){

    const options = {
        folder :"fileupload",
        resource_type :"auto"
    }
    if(quality){
        options.quality = quality;
    }
    console.log(file);
    
    return await cloudinary.uploader.upload(file.tempFilePath,options); 
}

  
exports.ImageUpload = async (req,res) => {
      
    try{
           
        // fetch data 
        const {name,tags,email} = req.body;

        console.log(name,tags,email);

        const file  = req.files.imageFile;
        console.log(file);

        // validation 

        const supportType = ["jpeg","jpg","png"];
          
        // checking file type 
        const fileType = file.name.split(".")[1].toLowerCase();
         console.log(fileType);
        
        if(!isFileTypeSupport(fileType,supportType)){

            return res.status(400).json({
                success:false,
                message:"File type not supported"
            })

        }
        
        const response = await uploadCloudinary(file,"fileupload");

        console.log(response);


        const fileData =  await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        return res.status(200).json({
        success:true,
        imageUrl:response.secure_url,
        message:"image Uploaded successfully"
        
    });
         
        }

    catch(err){

        console.log(err);
        return res.status(400).json({
            success:false,
            message:"something went wrong "
        })

    }
}


exports.videoUpload = async (req,res) => {
    try {
      

        // data fetch 

        const {name,email,tags} = req.body;
        console.log(name,email,tags);

        const file = req.files.videoFile;


        // validation 

        const supportedTypes = ["mp4","mov"];

        const fileType = file.name.split(".")[1].toLowerCase();

        
        console.log("fileType",fileType);

        if(!isFileTypeSupport(fileType,supportedTypes)){
            return res.status(400).json({
                success:true,
                message:"file format not supported"
            })
        }

        const response =  await uploadCloudinary(file,"fileupload");
          
        console.log(response);

        const fileData = await File.create({
            name,
            tags, 
            email,
            imageUrl:response.secure_url,
         })
        
         res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"video successfully uploaded"
         })

        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"something went wrong"
        })
        
    }
}




exports.ImageReducer = async (req,res) => {
      
    try{
           
        // fetch data 
        const {name,tags,email} = req.body;

        console.log(name,tags,email);

        const file  = req.files.imageFile;
        console.log(file);

        // validation 

        const supportType = ["jpeg","jpg","png"];
          
        // checking file type 
        const fileType = file.name.split(".")[1].toLowerCase();
         console.log(fileType);
        
        if(!isFileTypeSupport(fileType,supportType)){

            return res.status(400).json({
                success:false,
                message:"File type not supported"
            })

        }
        
        const response = await uploadCloudinary(file,"fileupload","50px","40px");

        console.log(response);


        const fileData =  await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        return res.status(200).json({
        success:true,
        imageUrl:response.secure_url,
        message:"image Uploaded successfully"
        
    });
         
    }


    catch(err){

        console.log(err);
        return res.status(400).json({
            success:false,
            message:"something went wrong "
        })

    }
}


