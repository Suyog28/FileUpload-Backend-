//App Create
const express = require("express");
const app = express();



//PORT find karna
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//Middleware 
app.use(express.json());

//File upload packege - intall i express-fileupload - Middelware
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true
}
));

//DB Connect

const db = require("./config/database");
db.connect();

//Cloudinary connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//API route mounting
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);

//Activation of server
app.listen(PORT, () => {
    console.log("Server running on port 3000")
})