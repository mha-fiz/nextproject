import Head from 'next/head';
import Header from './Header';
import styles from '../styles/Layout.module.css';
import Footer from './Footer';
import Showcase from './Showcase';
import { useRouter } from 'next/router';

const Layout = ({ title, description, keywords, children }) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />
      {router.pathname === '/' && <Showcase />}

      <div className={styles.container}>{children}</div>

      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: 'DJ Events',
  description: 'The only place for you to find the best events in town!',
  keywords: 'events, music, party',
};

export default Layout;
