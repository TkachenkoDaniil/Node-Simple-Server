const express = require('express');
const multer = require('multer');

const { uploadFile } = require('./file.controller');

const router = express.Router();
const upload = multer();

/* ---------- POST ---------- */

router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;
