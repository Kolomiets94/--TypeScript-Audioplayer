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
  const handleMore = async (id: number) => {
    const track = tracks.find((item) => item.id === id);
    if (!track) return;

    const text = `${track.artist} — ${track.title}`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: track.title, text, url: shareUrl });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(`${text}\n${shareUrl}`);
      window.alert('Название трека и ссылка скопированы');
    } catch {
      window.alert(text);
    }
  };

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
          <img src={`${process.env.PUBLIC_URL || ''}/assets/icons/CalendarBlank.svg`} alt="Added" />
        </span>
        <span></span> {/* пустая колонка для лайков */}
        <span className={styles.iconHeader}>
          <img src={`${process.env.PUBLIC_URL || ''}/assets/icons/watches.svg`} alt="Duration" />
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