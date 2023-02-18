const express = require('express');

const { signIn, updateTokens } = require('./signIn.controller');

const router = express.Router();

/* ---------- POST ---------- */

router.post('/new_token', updateTokens);

router.post('/', signIn);

module.exports = router;
