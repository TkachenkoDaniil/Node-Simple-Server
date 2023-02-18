const express = require('express');

const { verifyUserToken } = require('../../middlewares');

const { logout } = require('./logout.controller');

const router = express.Router();

/* ---------- POST ---------- */

router.post('/', verifyUserToken, logout);

module.exports = router;
