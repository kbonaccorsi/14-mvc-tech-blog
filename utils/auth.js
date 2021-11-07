const withAuth = (req, res, next) => {
  //if user isn't logged in, redirect to login route, otherwise continue to the next route
  if(!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;