import EventItem from '../../components/EventItem';
import Layout from '../../components/Layout';
import { API_URL } from '../../config';
import Link from 'next/link';
import Pagination from '../../components/Pagination';

const EVENT_PER_PAGE = 1;

export async function getServerSideProps({ query: { page = 1 } }) {
  const start =
    parseInt(page) === 1 ? 0 : (parseInt(page) - 1) * EVENT_PER_PAGE;

  const res = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${EVENT_PER_PAGE}&_start=${start}`
  );
  const events = await res.json();

  const eventsCount = await fetch(`${API_URL}/events/count`);
  const total = await eventsCount.json();

  return {
    props: { events, page: parseInt(page), total },
  };
}

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>All Event(s)</h1>
      {!events.length && <h3>No upcoming events</h3>}

      {events.map(eventItem => (
        <EventItem key={eventItem.id} eventItem={eventItem} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  );
}
