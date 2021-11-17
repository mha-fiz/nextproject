import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL } from '../../config';
import styles from '../../styles/EventPage.module.css';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  const paths = events.map(evt => ({
    params: { slug: evt.slug },
  }));

  console.log('paths: ', paths);

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;

  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const eventItem = await res.json();

  return {
    props: { eventItem: eventItem[0] },
    revalidate: 1,
  };
}

const EventPage = ({
  eventItem: { id, time, image, performers, venue, date, description, address },
}) => {
  const router = useRouter();

  const deleteEvent = async e => {
    if (confirm('Are you sure you want to delete the event?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push('/events');
      }
    }
  };

  return (
    <Layout>
      <ToastContainer />
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {new Date(date).toLocaleDateString('en-US')} at {time}
        </span>

        {image && (
          <div className={styles.image}>
            <Image
              src={image.formats.medium.url}
              alt="event-header"
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{performers}</p>
        <h3>Description:</h3>
        <p>{description}</p>
        <h3>Venue: {venue}</h3>
        <p>{address}</p>

        <Link href="/events">
          <a className={styles.back}>{'<'}Go back</a>
        </Link>
      </div>
    </Layout>
  );
};

export default EventPage;
