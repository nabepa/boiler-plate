import dotenv from 'dotenv';
dotenv.config();

function required(key, defalutValue = undefined) {
  const value = process.env[key] || defalutValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}
export const config = {
  // jwt: {
  //   secretKey: required('JWT_SECRET'),
  //   expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),
  // },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUND', 12)),
  },
  db: {
    mongoURI: required('MONGO_URI'),
  },
};
