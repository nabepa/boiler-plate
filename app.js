import express from 'express';
import Mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { User } from './model/User.js';
import { config } from './config/config.js';

const app = express();
const port = 8080;

console.log(process.env.NODE_ENV);

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

app.get('/', (req, res, next) => {
  res.send('Hello World!');
});

app.post('/register', (req, res, next) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({ success: true });
  });
});

app.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: 'User name or password is missing.',
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: 'User name or password is missing.',
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

app.listen(port, () => console.log(`Example app listening on port ${port}`));
