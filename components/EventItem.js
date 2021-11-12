import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/EventItem.module.css';

export default function EventItem({ eventItem }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            eventItem.image.formats.thumbnail.url ?? '/images/event-dafault.png'
          }
          alt="event-thumbnail"
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(eventItem.date).toLocaleDateString('en-US')} at{' '}
          {eventItem.time}
        </span>
        <h3>{eventItem.name}</h3>
      </div>

      <div>
        <Link href={`/events/${eventItem.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}
