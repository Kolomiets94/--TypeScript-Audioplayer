import React, { useState } from 'react';
import PlayerControls from './PlayerControls';
import VolumeControl from './VolumeControl';
import ProgressBar from './ProgressBar';
import { Track } from '../TrackList/TrackItem';
import styles from './Player.module.scss';

interface PlayerProps {
  track: Track;
  onLike: (id: number) => void;
}

const Player: React.FC<PlayerProps> = ({ track, onLike }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(track.id);
  };

  return (
    <div className={styles.player}>
      <div className={styles.trackInfo}>
        <img src={`/assets/images/${track.cover}`} alt={track.title} className={styles.cover} />
        <div className={styles.trackDetails}>
          <div className={styles.titleRow}>
            <h4>{track.title}</h4>
            <button
              className={`${styles.playerLikeButton} ${track.liked ? styles.active : ''}`}
              onClick={handleLikeClick}
              aria-label="Like"
            >
              <img src="/assets/icons/heart.svg" alt="Like" />
            </button>
          </div>
          <p>{track.artist}</p>
        </div>
      </div>

      <div className={styles.centerControls}>
        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onPrev={() => {}}
          onNext={() => {}}
          onShuffle={() => {}}
          onRepeat={() => {}}
        />
        <ProgressBar
          currentTime={26}
          duration={415}
          onSeek={(time) => console.log('Seek to', time)}
        />
      </div>

      <div className={styles.mobileProgress}>
        <ProgressBar
          currentTime={26}
          duration={415}
          onSeek={(time) => console.log('Seek to', time)}
        />
      </div>

      <div className={styles.actions}>
        <VolumeControl />
      </div>
    </div>
  );
};

export default Player;