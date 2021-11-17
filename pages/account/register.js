/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useContext, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/Layout';
import styles from '../../styles/AuthForm.module.css';
import AuthContext from '../../context/AuthContext';

const registerPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { register, error } = useContext(AuthContext);

  const handleSubmit = e => {
    e.preventDefault();

    if (!username.length || !email.length) {
      toast.error('Please fill all input field');
      return;
    }

    if (password !== passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    }

    register({ username, email, password });
  };
  return (
    <Layout title={'Register'}>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
          />

          <input type="submit" value="Register" className="btn" />
        </form>

        <p>
          Already have an account? <Link href="/account/login">Login here</Link>
        </p>
      </div>
    </Layout>
  );
};

export default registerPage;
