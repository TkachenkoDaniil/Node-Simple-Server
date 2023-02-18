const express = require('express');
const multer = require('multer');

const {
  uploadFile,
  getFileInfo,
  updateFile,
  deleteFile,
} = require('./file.controller');

const router = express.Router();
const upload = multer();

/* ---------- GET ---------- */

router.get('/:id', getFileInfo);

/* ---------- PUT ---------- */

router.put('/update/:id', upload.single('file'), updateFile);

/* ---------- POST ---------- */

router.post('/upload', upload.single('file'), uploadFile);

/* ---------- DELETE ---------- */

router.delete('/delete/:id', deleteFile);

module.exports = router;
