const express = require("express");

const router = express.Router();


const { imageUpload, videoUpload, imageReduceUpload, localFileUpload } = require("../controllers/fileUpload");


//API Route Making

router.post("/localFileUpload", localFileUpload);

//Clodinary Image Upload Route Entry

router.post("/imageUpload", imageUpload);

//Clodinary Video Upload Route Entry

router.post("/videoUpload", videoUpload);


//Clodinary imageReduceUpload Route Entry

router.post("/imageReduceUpload", imageReduceUpload);
module.exports = router;