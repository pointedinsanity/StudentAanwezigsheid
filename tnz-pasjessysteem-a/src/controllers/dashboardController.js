function show(req, res) {
  res.render('dashboard', { user: req.user });
}

module.exports = { show };