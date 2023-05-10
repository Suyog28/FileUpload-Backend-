const express = require("express");

const router = express.Router();


const { imageUpload, videoUpload, imageReduceUpload, localFileUpload } = require("../controllers/fileUpload");


//API Route Making

router.post("/localFileUpload", localFileUpload);

module.exports = router;