const jwt = require('jsonwebtoken');

// MIDDLEWARE FOR AUTHORIZATION (MAKING SURE THEY ARE LOGGED IN)
const isAuthenticated = async (req, res, next) => {
  req.headers.authorization = req.cookies.authorization;

  try {
    // check if auth header exists
    if (req.headers.authorization) {
      // parse token from header
      const token = req.headers.authorization; //split the header and get the token
      if (token) {
        const payload = await jwt.verify(token, process.env.SECRET);
        if (payload) {
          // store user data in request object
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
      // Créer plutôt une espèce de page d'erreur demandant de se connecter
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
