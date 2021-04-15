import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const generateHash = (dataString: string): string => {
  const newToken = crypto.createHash('md5').update(dataString).digest('hex');
  return newToken;
};

interface verifyTokenPayload {
  [keys: string]: any;
}

export const generateVerifyToken = (payload: verifyTokenPayload, secret: string): string => {
  const newVerifyToken: string = jwt.sign(payload, secret, {
    expiresIn: '1d'
  });
  return newVerifyToken;
};
