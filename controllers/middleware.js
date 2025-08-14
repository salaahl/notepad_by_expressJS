const jwt = require('jsonwebtoken');

// MIDDLEWARE FOR AUTHORIZATION (MAKING SURE THEY ARE LOGGED IN)
const isAuthenticated = async (req, res, next) => {
  req.headers.authorization = req.cookies.authorization;

  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      if (token) {
        const payload = jwt.verify(token, process.env.SECRET);
        if (payload) {
          req.user = payload;
          // Renouvellement du temps d'expiration du cookie
          res.cookie('authorization', req.headers.authorization, {
            maxAge: 600 * 1000,
            httpOnly: true,
          });
          next();
        } else {
          res.status(400).json({ error: 'token verification failed' });
        }
      } else {
        res.status(400).json({ error: 'malformed auth header' });
      }
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

// export custom middleware
module.exports = {
  isAuthenticated,
};
