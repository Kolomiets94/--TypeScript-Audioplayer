import React from 'react';
import TrackItem, { Track } from './TrackItem';
import styles from './TrackList.module.scss';

interface TrackListProps {
  tracks: Track[];
  currentTrackId: number;
  onTrackSelect: (id: number) => void;
  onLike: (id: number) => void;
}

const TrackList: React.FC<TrackListProps> = ({
  tracks,
  currentTrackId,
  onTrackSelect,
  onLike,
}) => {
  const handleMore = (id: number) => console.log('More', id);

  if (tracks.length === 0) {
    return <div className={styles.emptyState}>Ничего не найдено</div>;
  }

  return (
    <div className={styles.trackList}>
      <div className={styles.trackHeader}>
        <span>№</span>
        <span>Название</span>
        <span>Альбом</span>
        <span className={styles.iconHeader}>
          <img src="/assets/icons/CalendarBlank.svg" alt="Added" />
        </span>
        <span></span> {/* пустая колонка для лайков */}
        <span className={styles.iconHeader}>
          <img src="/assets/icons/watches.svg" alt="Duration" />
        </span>
        
      </div>
      {tracks.map((track) => (
        <TrackItem
          key={track.id}
          track={track}
          isPlaying={track.id === currentTrackId}
          onLike={onLike}
          onMore={handleMore}
          onSelect={onTrackSelect}
        />
      ))}
    </div>
  );
};

export default TrackList;