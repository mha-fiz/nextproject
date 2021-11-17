/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useContext, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/Layout';
import styles from '../../styles/AuthForm.module.css';
import AuthContext from '../../context/AuthContext';

const loginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, error } = useContext(AuthContext);

  const handleSubmit = e => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <Layout title={'Login'}>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Login
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
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

          <input type="submit" value="Login" className="btn" />
        </form>

        <p>
          Do not have an account?{' '}
          <Link href="/account/register">Register here</Link>
        </p>
      </div>
    </Layout>
  );
};

export default loginPage;
