// src/app/components/Notification.tsx
import styles from './Notification.module.scss';

interface NotificationProps {
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  return <p className={styles.notification}>{message}</p>;
};

export default Notification;
