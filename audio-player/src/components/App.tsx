import React, { useState, useRef } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Search from './Search/Search';
import TrackList from './TrackList/TrackList';
import Profile from './Profile/Profile';
import Player from './Player/Player';
import styles from './App.module.scss';
import '../styles/global.scss';
import { tracks as initialTracks } from '../data/tracks';
import { Track } from './TrackList/TrackItem';

export type View = 'tracks' | 'favorites' | 'profile';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('tracks');
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState<Track[]>(initialTracks);
  const [currentTrackId, setCurrentTrackId] = useState<number>(3);
  const [username, setUsername] = useState('username');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editableName, setEditableName] = useState(username);
  const [avatarUrl, setAvatarUrl] = useState('/assets/images/user.png');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLike = (id: number) => {
    setTracks(prev =>
      prev.map(track =>
        track.id === id ? { ...track, liked: !track.liked } : track
      )
    );
  };

  const handleTrackSelect = (id: number) => {
    setCurrentTrackId(id);
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  const handleEditStart = () => {
    setEditableName(username);
    setIsEditingName(true);
  };

  const handleEditSave = () => {
    if (editableName.trim()) {
      setUsername(editableName.trim());
    }
    setIsEditingName(false);
  };

  const handleEditCancel = () => {
    setIsEditingName(false);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentTrack = tracks.find(t => t.id === currentTrackId) || tracks[0];

  const getFilteredTracks = () => {
    let filtered = tracks;

    if (currentView === 'favorites') {
      filtered = filtered.filter(track => track.liked);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(track =>
        track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query) ||
        track.album.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const filteredTracks = getFilteredTracks();

  const renderContent = () => {
    switch (currentView) {
      case 'tracks':
      case 'favorites':
        return (
          <TrackList
            tracks={filteredTracks}
            currentTrackId={currentTrackId}
            onTrackSelect={handleTrackSelect}
            onLike={handleLike}
          />
        );
      case 'profile':
        return (
          <Profile
            username={username}
            email="user@example.com"
            avatarUrl={avatarUrl}
            onAvatarChange={handleAvatarChange}
            onLogout={handleLogout}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.app}>
      <Sidebar
        currentView={currentView}
        onViewChange={handleViewChange}
        username={username}
        avatarUrl={avatarUrl}
      />
      <main className={styles.main}>
        {/* Поиск (скрыт на мобильных) */}
        <Search onSearch={handleSearch} />

        {/* Десктопный профиль (скрыт на мобильных) */}
        <div className={styles.profileBlock}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${avatarUrl})` }}
            onClick={handleAvatarClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          {isEditingName ? (
            <div className={styles.editNameContainer}>
              <input
                type="text"
                value={editableName}
                onChange={(e) => setEditableName(e.target.value)}
                className={styles.nameInput}
                autoFocus
              />
              <button onClick={handleEditSave} className={styles.saveButton}>✓</button>
              <button onClick={handleEditCancel} className={styles.cancelButton}>✗</button>
            </div>
          ) : (
            <>
              <span className={styles.username}>{username}</span>
              <img
                src="/assets/icons/chevron-right.svg"
                alt="Edit"
                className={styles.chevronImg}
                onClick={handleEditStart}
              />
            </>
          )}
        </div>

        {/* Мобильный хедер (появляется только на мобильных) */}
        <div className={styles.mobileHeader}>
          <div className={styles.logo}>
            <img src="/assets/icons/Mithosis.svg" alt="VibeCast" />
            <span>VibeCast Studio</span>
          </div>
          <div className={styles.mobileProfile}>
            <img
              src={avatarUrl}
              alt="User"
              className={styles.mobileAvatar}
              onClick={handleAvatarClick}
            />
            <span className={styles.mobileUsername}>{username}</span>
          </div>
        </div>

        {/* Мобильные кнопки навигации (только на мобильных) */}
        <div className={styles.mobileNavButtons}>
          <button
            className={`${styles.navButton} ${styles.tracksButton} ${
              currentView === 'tracks' ? styles.active : ''
            }`}
            onClick={() => handleViewChange('tracks')}
          >
            <img src="/assets/icons/Play.svg" alt="Play" />
            Аудиокомпозиции
          </button>
          <button
            className={`${styles.navButton} ${styles.favoritesButton} ${
              currentView === 'favorites' ? styles.active : ''
            }`}
            onClick={() => handleViewChange('favorites')}
          >
            Избранное
          </button>
        </div>

        <div className={styles.contentWrapper}>
          {/* Заголовок страницы (скрыт на мобильных) */}
          <div className={styles.contentHeader}>
            <h1>
              {currentView === 'tracks'
                ? 'Аудиокомпозиции и треки'
                : currentView === 'favorites'
                ? 'Избранное'
                : 'Профиль'}
            </h1>
          </div>
          <div className={styles.content}>{renderContent()}</div>
        </div>
      </main>
      <Player track={currentTrack} onLike={handleLike} />
    </div>
  );
};

export default App;