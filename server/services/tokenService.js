import crypto from 'crypto';

import { IV_LENGTH, SECURITY_KEY } from '../config.js';

// 로그인 성공 시 user.id를 토큰 문자열로 암호화한다.
export const encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECURITY_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

// Authorization 헤더 토큰을 복호화해 원본 user.id를 얻는다.
export const decrypt = (token) => {
  const textParts = token.split(':');
  const iv = Buffer.from(textParts.shift() ?? '', 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SECURITY_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};
