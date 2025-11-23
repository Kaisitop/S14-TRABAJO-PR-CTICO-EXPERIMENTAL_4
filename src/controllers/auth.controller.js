// src/controllers/auth.controller.js
export const googleCallback = (req, res) => {
  // Después de la autenticación exitosa, redirige al dashboard
  res.redirect('/auth/dashboard');
};

export const dashboard = (req, res) => {
  if (!req.user) return res.redirect('/auth/google'); // protege ruta
  res.render('dashboard', { user: req.user });
};

export const logout = (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
};
