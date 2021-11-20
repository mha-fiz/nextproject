import Layout from '../../components/Layout';
import { API_URL } from '../../config';
import { parseCookie } from '../../utils';
import styles from '../../styles/Dashboard.module.css';
import { DashboardEvent } from '../../components/DashboardEvent';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export async function getServerSideProps({ req }) {
  const token = parseCookie(req);

  //API route we manually create to handle all events of logged in user
  const res = await fetch(`${API_URL}/events/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: {
      events,
      token,
    },
  };
}

export default function DashboardPage({ events, token }) {
  const router = useRouter();
  const deleteEvent = async id => {
    if (confirm('Are you sure you want to delete the event?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          toast.error('No token provided');
          return;
        }
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };

  return (
    <Layout title={'Dashboard'}>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map(evt => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
}
