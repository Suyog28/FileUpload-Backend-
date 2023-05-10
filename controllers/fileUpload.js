const file = require("../models/File");

//LocalFileupload Handler Functions


exports.localFileUpload = async (req, res) => {
    try {

        //Fetch File

        const file = req.files.file;
        console.log(file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: "Local File Uploaded Successfully"
        })
    } catch (err) {
        console.log(err);
    }
}