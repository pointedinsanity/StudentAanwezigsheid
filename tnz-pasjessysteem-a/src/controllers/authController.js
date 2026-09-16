const supabase = require('../config/supabaseClient');

function showLogin(req, res) {
  res.render('login', { error: null, message: null, email: '', student_number: '', mode: 'login' });
}

function showRegister(req, res) {
  res.render('login', { error: null, message: null, email: '', student_number: '', mode: 'register' });
}

function registrationErrorMessage(error) {
  const message = typeof error.message === 'string' ? error.message.toLowerCase() : '';

  if (message.includes('rate limit') || message.includes('too many requests')) {
    return 'Supabase heeft tijdelijk te veel bevestigingsmails ontvangen. Wacht even of gebruik een bestaand account.';
  }

  return error.message || 'Registreren is niet gelukt. Probeer het opnieuw.';
}

async function login(req, res, next) {
  const email = typeof req.body.email === 'string' ? req.body.email.trim() : '';
  const password = typeof req.body.password === 'string' ? req.body.password : '';

  if (!email || !password) {
    return res.status(422).render('login', {
      error: 'Vul je e-mailadres en wachtwoord in.',
      message: null,
      email,
      student_number: '',
      mode: 'login'
    });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.session) {
      return res.status(401).render('login', {
        error: 'De inloggegevens zijn niet juist.',
        message: null,
        email,
        student_number: '',
        mode: 'login'
      });
    }

    res.cookie('access_token', data.session.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: data.session.expires_in * 1000
    });

    return res.redirect('/dashboard');
  } catch (err) {
    return next(err);
  }
}

async function register(req, res, next) {
  const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
  const email = typeof req.body.email === 'string' ? req.body.email.trim() : '';
  const studentNumber = typeof req.body.student_number === 'string' ? req.body.student_number.trim() : '';
  const password = typeof req.body.password === 'string' ? req.body.password : '';
  const passwordConfirmation = typeof req.body.password_confirmation === 'string'
    ? req.body.password_confirmation
    : '';

  if (!name || !email || !studentNumber || !password || !passwordConfirmation) {
    return res.status(422).render('login', {
      error: 'Vul alle velden in, inclusief studentnummer.',
      message: null,
      email,
      student_number: studentNumber,
      mode: 'register'
    });
  }

  if (password.length < 6) {
    return res.status(422).render('login', {
      error: 'Je wachtwoord moet minimaal 6 tekens bevatten.',
      message: null,
      email,
      student_number: studentNumber,
      mode: 'register'
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(422).render('login', {
      error: 'De wachtwoorden komen niet overeen.',
      message: null,
      email,
      student_number: studentNumber,
      mode: 'register'
    });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, student_number: studentNumber } }
    });

    if (error) {
      return res.status(400).render('login', {
        error: registrationErrorMessage(error),
        message: null,
        email,
        student_number: studentNumber,
        mode: 'register'
      });
    }

    if (data.session) {
      res.cookie('access_token', data.session.access_token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: data.session.expires_in * 1000
      });
      return res.redirect('/dashboard');
    }

    return res.render('login', {
      error: null,
      message: 'Account aangemaakt. Controleer je e-mail om je account te bevestigen.',
      email,
      student_number: '',
      mode: 'login'
    });
  } catch (err) {
    return next(err);
  }
}

function logout(req, res) {
  res.clearCookie('access_token');
  res.redirect('/auth/login');
}

module.exports = { showLogin, showRegister, login, register, logout };