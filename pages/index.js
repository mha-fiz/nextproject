import EventItem from '../components/EventItem';
import Layout from '../components/Layout';
import { API_URL } from '../config';
import Link from 'next/link';

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Upcoming Event(s)</h1>
      {!events.length && <h3>No upcoming events</h3>}

      {events.map(eventItem => (
        <EventItem key={eventItem.id} eventItem={eventItem} />
      ))}

      {events.length && (
        <Link href="/events">
          <a className="btn-secondary">View All</a>
        </Link>
      )}
    </Layout>
  );
}
