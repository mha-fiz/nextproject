import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import styles from '../styles/Modal.module.css';

export default function Modal({ isModalShow, title, children, onModalClose }) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true), [isBrowser]);

  const handleModalClose = e => {
    e.preventDefault();
    onModalClose();
  };

  const modalContent = isModalShow ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href="#" onClick={handleModalClose}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    );
  } else {
    return null;
  }
}
