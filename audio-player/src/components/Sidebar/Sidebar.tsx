import React from 'react';
import styles from './Sidebar.module.scss';

export type View = 'tracks' | 'favorites' | 'profile';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  username: string;
  avatarUrl: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, username, avatarUrl }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles['logo-content']}>
          <img src="/assets/icons/Mithosis.svg" alt="VibeCast" />
          <span>VibeCast Studio</span>
        </div>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li
            className={currentView === 'tracks' ? styles.active : ''}
            onClick={() => onViewChange('tracks')} // ← здесь было 'favorites'? теперь правильно
          >
            <img src="/assets/icons/MusicNotes.svg" alt="Tracks" />
            <span>Аудиокомпозиции</span>
          </li>
          <li
            className={currentView === 'favorites' ? styles.active : ''}
            onClick={() => onViewChange('favorites')} // ← здесь было 'tracks'? теперь правильно
          >
            <img src="/assets/icons/MusicNotes.svg" alt="Favorites" />
            <span>Избранное</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;