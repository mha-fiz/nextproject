import Layout from '../../components/Layout';
import { useState } from 'react';
import router, { useRouter } from 'next/router';
import styles from '../../styles/Form.module.css';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../../config';
import { parseCookie } from '../../utils';

export async function getServerSideProps({ req }) {
  const token = parseCookie(req);

  return {
    props: {
      token,
    },
  };
}

const AddEvent = ({ token }) => {
  const [values, setValues] = useState({
    name: '',
    address: '',
    performers: '',
    venue: '',
    date: '',
    time: '',
    description: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const hasEmptyFields = Object.values(values).some(el => el === '');

    if (hasEmptyFields) {
      toast.error('Please fill all input fields');
      return;
    }

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('No token provided');
        return;
      }
      toast.error('Something went wrong :(');
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
    }
  };

  return (
    <Layout title={'Add New Event'}>
      <Link href="/events">Go Back</Link>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              id="performers"
              name="performers"
              type="text"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              id="venue"
              name="venue"
              type="text"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              id="time"
              name="time"
              type="text"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            value={values.description}
            onChange={handleInputChange}
          />
        </div>

        <input type="submit" value="Add Event" className="btn" />
      </form>
      <ToastContainer />
    </Layout>
  );
};

export default AddEvent;
