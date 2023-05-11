const mongoose = require("mongoose");
const nodemailer = require("nodemailer")


require("dotenv").config();

//Schema creation
const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    tags: {
        type: String
    },
    email: {
        type: String
    }

})

//Post Middleware for nodemailer

fileSchema.post("save", async (doc) => {
    try {
        console.log("DOC", doc)
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER, // generated ethereal user
                pass: process.env.MAIL_PASS, // generated ethereal password
            },
        });


        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'SuyogMuley', // sender address
            to: doc.email, // list of receivers
            subject: "New File Uploaded on clodinary ✔", // Subject line
            //text: "Hello world?", // plain text body
            html: `<b>File Uploaded</b><p>Successfully</p><p>View here : <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`, // html body
        });

        console.log(info);

    } catch (err) {
        console.log(err)
    }
})



const File = mongoose.model("File", fileSchema);

module.exports = File;