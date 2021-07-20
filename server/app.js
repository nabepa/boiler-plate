import express from 'express';
import Mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { User } from './model/User.js';
import { config } from './config/config.js';
import { auth } from './middleware/auth.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(cookieParser());

Mongoose.connect(config.db.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

app.post('/api/register', (req, res, next) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({ success: true });
  });
});

app.post('/api/login', (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: 'Email address is missing.',
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: 'Password is missing.',
        });
      }
    });
    user.generateToken((err, user) => {
      if (err) {
        return res.status(400).send(err);
      }
      res
        .cookie('x_auth', user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id });
    });
  });
});

app.get('/api/auth', auth, (req, res, next) => {
  res.status(200).json({
    _id: req.user._id,
    isAdimin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get('/api/logout', auth, (req, res, next) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).send({
      success: true,
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
