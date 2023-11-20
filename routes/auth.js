const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const signup = require('../controllers/auth/signup');
const login = require('../controllers/auth/login');
const logout = require('../controllers/auth/logout');
const current = require('../controllers/auth/current');
const sendNewsletterEmail = require('../controllers/auth/sendNewsletterEmail');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', auth, logout);
router.get('/current', auth, current);
router.post('/subscribe', sendNewsletterEmail);

module.exports = router;