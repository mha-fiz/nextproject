/* eslint-disable import/no-anonymous-default-export */
import { API_URL } from '../../config';
import cookie from 'cookie';

export default async (req, res) => {
  if (req.method === 'POST') {
    //remove cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: new Date(0), //intentionally set a day that's already passed
        sameSite: 'strict',
        path: '/',
      })
    );

    res.status(200).json({ message: 'Logout success' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
