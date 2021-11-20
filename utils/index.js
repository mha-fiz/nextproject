import cookie from 'cookie';

export const parseCookie = req => {
  const parsed = cookie.parse(req ? req.headers.cookie || '' : '');
  const { token } = parsed;
  return token;
};
