const express = require('express');
const multer = require('multer');

const { verifyUserToken } = require('../../middlewares');

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

router.get('/list', verifyUserToken, getFileList);

router.get('/:id', verifyUserToken, getFileInfo);

router.get('/download/:id', verifyUserToken, downloadFile);

/* ---------- PUT ---------- */

router.put('/update/:id', verifyUserToken, upload.single('file'), updateFile);

/* ---------- POST ---------- */

router.post('/upload', verifyUserToken, upload.single('file'), uploadFile);

/* ---------- DELETE ---------- */

router.delete('/delete/:id', verifyUserToken, deleteFile);

module.exports = router;
