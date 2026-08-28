const Student = require('../models/studentModel');

async function list(req, res, next) {
  try {
    const students = await Student.getAllStudents();
    res.render('index', { students });
  } catch (err) {
    next(err);
  }
}

module.exports = { list };
