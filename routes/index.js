const express = require('express');

const signUpRouter = require('./signUp/signUp');
const signInRouter = require('./signIn/signIn');
const fileRouter = require('./file/file');
const logOutRouter = require('./logout/logout');

const router = express.Router();

router.use('/signUp', signUpRouter);
router.use('/signIn', signInRouter);
router.use('/file', fileRouter);
router.use('/logout', logOutRouter);

module.exports = router;
