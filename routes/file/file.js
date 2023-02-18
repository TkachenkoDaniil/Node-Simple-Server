const express = require('express');
const multer = require('multer');

const {
  uploadFile,
  getFileInfo,
  updateFile,
  deleteFile,
  getFileList,
  downloadFile,
} = require('./file.controller');

const router = express.Router();
const upload = multer();

/* ---------- GET ---------- */

router.get('/list', getFileList);

router.get('/:id', getFileInfo);

router.get('/download/:id', downloadFile);

/* ---------- PUT ---------- */

router.put('/update/:id', upload.single('file'), updateFile);

/* ---------- POST ---------- */

router.post('/upload', upload.single('file'), uploadFile);

/* ---------- DELETE ---------- */

router.delete('/delete/:id', deleteFile);

module.exports = router;
