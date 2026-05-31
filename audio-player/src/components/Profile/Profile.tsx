import React, { useRef } from 'react';
import styles from './Profile.module.scss';

interface ProfileProps {
  username: string;
  email: string;
  avatarUrl: string;                // новый проп
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // новый проп
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({
  username,
  email,
  avatarUrl,
  onAvatarChange,
  onLogout,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarContainer} onClick={handleAvatarClick}>
          <img src={avatarUrl} alt={username} className={styles.avatar} />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={onAvatarChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <h2 className={styles.username}>{username}</h2>
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.infoItem}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>{email}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Member since</span>
          <span className={styles.value}>January 2023</span>
        </div>
      </div>
      <button className={styles.logoutButton} onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;