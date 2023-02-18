const express = require('express');

const { signUp } = require('./signUp.controller');

const router = express.Router();

/* ---------- POST ---------- */

router.post('/', signUp);

module.exports = router;
