import EventItem from '../../components/EventItem';
import Layout from '../../components/Layout';
import { API_URL } from '../../config';
import qs from 'qs';
import { useRouter } from 'next/router';
import Link from 'next/link';

export async function getServerSideProps(context) {
  const {
    query: { term },
  } = context;
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { venue_contains: term },
        { description_contains: term },
      ],
    },
  });
  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: { events },
  };
}

export default function SearchPage({ events }) {
  const router = useRouter();
  return (
    <Layout title="Search Page">
      <Link href="/events">Go back</Link>
      <h1>Search result for: {router.query.term}</h1>
      {!events.length && <h3>No upcoming events</h3>}

      {events.map(eventItem => (
        <EventItem key={eventItem.id} eventItem={eventItem} />
      ))}
    </Layout>
  );
}
