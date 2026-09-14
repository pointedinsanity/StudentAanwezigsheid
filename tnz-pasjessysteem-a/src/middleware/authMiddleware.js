const supabase = require('../config/supabaseClient');

async function authMiddleware(req, res, next) {
  const accessToken = req.cookies && req.cookies.access_token;

  if (!accessToken) {
    return res.redirect('/auth/login');
  }

  try {
    const { data, error } = await supabase.auth.getUser(accessToken);

    if (error || !data.user) {
      res.clearCookie('access_token');
      return res.redirect('/auth/login');
    }

    req.user = data.user;
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = authMiddleware;