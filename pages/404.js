import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/404.module.css';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function NotFoundPage() {
  return (
    <Layout title={'Page not found'}>
      <div className={styles.error}>
        <h1>
          {' '}
          <FaExclamationTriangle /> Error 404
        </h1>
        <h4>Page you are looking for does not exist :( </h4>
        <Link href="/">Return to home</Link>
      </div>
    </Layout>
  );
}
