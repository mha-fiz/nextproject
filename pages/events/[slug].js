import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const Event = () => {
  const router = useRouter();
  console.log(router);
  return (
    <Layout>
      <p>Slug page: {router.query.slug}</p>
      <p>Event</p>
      <Link href="/">Home</Link>
    </Layout>
  );
};

export default Event;
