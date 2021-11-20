import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL } from '../../config';
import styles from '../../styles/EventPage.module.css';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/events`);
//   const events = await res.json();

//   const paths = events.map(evt => ({
//     params: { slug: evt.slug },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps(context) {
//   const {
//     params: { slug },
//   } = context;

//   const res = await fetch(`${API_URL}/events?slug=${slug}`);
//   const eventItem = await res.json();

//   return {
//     props: { eventItem: eventItem[0] },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const evt = await res.json();

  return {
    props: {
      eventItem: evt[0],
    },
  };
}

const EventPage = ({ eventItem }) => {
  return (
    <Layout>
      <ToastContainer />
      <div className={styles.event}>
        <span>
          {new Date(eventItem.date).toLocaleDateString('en-US')} at{' '}
          {eventItem.time}
        </span>
        <h1>{eventItem.name}</h1>

        {eventItem.image && (
          <div className={styles.image}>
            <Image
              src={eventItem.image.formats.medium.url}
              alt="event-header"
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{eventItem.performers}</p>
        <h3>Description:</h3>
        <p>{eventItem.description}</p>
        <h3>Venue: {eventItem.venue}</h3>
        <p>{eventItem.address}</p>

        <Link href="/events">
          <a className={styles.back}>{'<'}Go back</a>
        </Link>
      </div>
    </Layout>
  );
};

export default EventPage;
