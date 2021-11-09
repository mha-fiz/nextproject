import EventItem from '../../components/EventItem';
import Layout from '../../components/Layout';
import { API_URL } from '../../config';

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}

export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>All Event(s)</h1>
      {!events.length && <h3>No upcoming events</h3>}

      {events.map(eventItem => (
        <EventItem key={eventItem.id} eventItem={eventItem} />
      ))}
    </Layout>
  );
}
