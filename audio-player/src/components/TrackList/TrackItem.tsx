import React from 'react';
import styles from './TrackList.module.scss';

export interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
  added: string;
  liked?: boolean;
}

interface TrackItemProps {
  track: Track;
  isPlaying: boolean;
  onLike: (id: number) => void;
  onMore: (id: number) => void;
  onSelect: (id: number) => void;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, isPlaying, onLike, onMore, onSelect }) => {
  return (
    <div
      className={`${styles.trackRow} ${isPlaying ? styles.playing : ''}`}
      onClick={() => onSelect(track.id)}
    >
      <span className={styles.trackNumber}>{track.id}</span>
      <div className={styles.trackMain}>
        <img
          src={`/assets/images/${track.cover}`}
          alt={track.title}
          className={styles.cover}
        />
        <div className={styles.trackInfo}>
          <span className={styles.title}>{track.title}</span>
          <span className={styles.artist}>{track.artist}</span>
        </div>
      </div>
      <span className={styles.trackAlbum}>{track.album}</span>
      <span className={styles.trackAdded}>{track.added}</span>
      <div className={styles.trackLikes}>
        <button
          className={`${styles.likeButton} ${track.liked ? styles.active : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onLike(track.id);
          }}
          aria-label="Like"
        >
          <img src="/assets/icons/heart.svg" alt="Like" />
        </button>
      </div>
      <span className={styles.trackDuration}>{track.duration}</span>
      <div className={styles.trackActions}>
        <button
          className={styles.moreButton}
          onClick={(e) => {
            e.stopPropagation();
            onMore(track.id);
          }}
          aria-label="More"
        >
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </button>
      </div>
    </div>
  );
};

export default TrackItem;