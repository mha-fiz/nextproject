import Layout from '../../../components/Layout';
import { useState, useEffect } from 'react';
import router, { useRouter } from 'next/router';
import styles from '../../../styles/Form.module.css';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../../../config';
import { format } from 'date-fns';
import { FaImage } from 'react-icons/fa';
import Modal from '../../../components/Modal';
import Image from 'next/image';
import ImageUpload from '../../../components/ImageUpload';
import { parseCookie } from '../../../utils';

export async function getServerSideProps(context) {
  const {
    params: { id },
    req,
  } = context;

  const res = await fetch(`${API_URL}/events/${id}`);
  const data = await res.json();

  const token = parseCookie(req);

  return {
    props: {
      evt: data,
      token,
    },
  };
}

const EditEvent = ({ evt, token }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  const [values, setValues] = useState({
    name: evt.name,
    address: evt.address,
    performers: evt.performers,
    venue: evt.venue,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });

  const [imagePreview, setImagePreview] = useState(
    evt?.image?.formats?.thumbnail?.url ?? null
  );

  const [isModalShow, setIsModalShow] = useState(false);

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

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        toast.error('No token provided');
      }
      toast.error('Something went wrong :(');
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
    }
  };

  const onImageUploaded = async e => {
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = await res.json();

    setImagePreview(data.image.formats.thumbnail.url);
    setIsModalShow(false);
  };

  return (
    <Layout title={'Edit Event'}>
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
              value={format(new Date(values.date), 'yyyy-MM-dd')}
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

        <input type="submit" value="Update Event" className="btn" />
      </form>
      <ToastContainer />
      <h2>Event Image(s)</h2>
      {imagePreview ? (
        <Image
          src={imagePreview}
          alt="uploaded-image-thumbnail"
          height={100}
          width={170}
        />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button onClick={() => setIsModalShow(true)} className="btn-secondary">
          <FaImage /> Upload Image
        </button>
      </div>

      <Modal
        isModalShow={isModalShow}
        onModalClose={() => setIsModalShow(false)}
      >
        <ImageUpload
          evtId={evt.id}
          onImageUploaded={onImageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
};

export default EditEvent;
