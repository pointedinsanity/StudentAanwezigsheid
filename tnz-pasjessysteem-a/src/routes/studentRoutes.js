const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', (req, res) => res.redirect('/auth/login'));

router.get('/students', studentController.list);

module.exports = router;
