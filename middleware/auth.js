import { User } from '../model/User.js';

export const auth = (req, res, next) => {
  const token = req.cookies.x_auth;
  console.log(req.cookies);

  User.findByToken(token, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      return res.json({ isAuth: false, error: true });
    }
    req.token = token;
    req.user = user;
    next();
  });
};
