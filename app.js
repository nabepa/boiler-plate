import express from 'express';
import Mongoose from 'mongoose';
import { User } from './model/User.js';
import { config } from './config/config.js';
// import { config } from './config/key.js';

const app = express();
const port = 8080;

console.log(process.env.NODE_ENV);

app.use(express.json());

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

app.listen(port, () => console.log(`Example app listening on port ${port}`));
