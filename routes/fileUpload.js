const express = require("express");

const router = express.Router();

const {ImageUpload,videoUpload,LocalFileUpload, ImageReducer} = require("../controllers/fileUpload");

// router.post("/ImageUpload",ImageUpload);
// router.post("/videoupload",videoupload);
// router.post("/imageReducerUpload",imageReducerUpload);
router.post("/LocalFileUpload",LocalFileUpload);
router.post("/ImageUpload",ImageUpload);
router.post("/videoUpload",videoUpload);
router.post("/ImageReducer",ImageReducer);
module.exports = router;
