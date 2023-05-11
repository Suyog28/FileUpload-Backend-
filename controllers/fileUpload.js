const File = require("../models/File");

const cloudinary = require("cloudinary").v2;

//LocalFileupload Handler Functions

exports.localFileUpload = async (req, res) => {
    try {

        //Fetch File
        const file = req.files.file;
        console.log(file);

        //Create a path where file need to stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;


        //Add path to the move function
        file.mv(path, (err) => {
            console.log(err);
        });

        //Crate a successfull response
        res.json({
            success: true,
            message: "Local File Uploaded Successfully"
        })
    } catch (err) {
        console.log(err);
    }
}


//Cloudinary Upload functionality 
const isFileTypeSupported = (type, supportedTypes) => {
    return supportedTypes.includes(type);
}

const uploadFileToCloudinary = async (file, folder, quality) => {
    const options = { folder };

    if (quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath, options);

}

exports.imageUpload = async (req, res) => {
    try {
        //Data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        //File fetch
        const file = req.files.imageFile;
        console.log("File fetch", file);

        //Validation

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            })
        }

        //Response Cloudinary Functions

        const response = await uploadFileToCloudinary(file, "SuyogMedia");
        console.log(response);

        //DB Entry Save

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Successfully uploaded"
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })

    }
}

exports.videoUpload = async (req, res) => {
    try {
        //Data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        //File fetch
        const file = req.files.videoFile;
        console.log("File fetch", file);

        //Validation

        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split(".")[1].toLowerCase();
        // const fileSizeLimit = 4194304;

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            })
        }

        //Response Cloudinary Functions

        const response = await uploadFileToCloudinary(file, "SuyogMedia");
        console.log(response);

        //DB Entry Save

        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl: response.secure_url
        });

        res.json({
            success: true,
            videoUrl: response.secure_url,
            message: "Video Successfully uploaded"
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })

    }
}

exports.imageReduceUpload = async (req, res) => {
    try {
        //Data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        //File fetch
        const file = req.files.imageFile;
        console.log("File fetch", file);

        //Validation

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".")[1].toLowerCase();
        // const fileSizeLimit = 4194304;

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            })
        }

        //Response Cloudinary Functions

        const response = await uploadFileToCloudinary(file, "SuyogMedia", 30);
        console.log(response);

        //DB Entry Save

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Size reduce Successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })

    }
}