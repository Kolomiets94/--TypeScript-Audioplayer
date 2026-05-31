import React from 'react';
import styles from './Player.module.scss';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onShuffle: () => void;
  onRepeat: () => void;
  isShuffle?: boolean;
  repeatMode?: 'off' | 'one' | 'all';
  onSkipForward?: () => void;
  onSkipBackward?: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying, onPlayPause, onPrev, onNext, onShuffle, onRepeat,
  isShuffle = false, repeatMode = 'off', onSkipForward, onSkipBackward,
}) => {
  return (
    <div className={styles.controls}>
      <button className={`${styles.controlButton} ${isShuffle ? styles.active : ''}`} onClick={onShuffle}>
        <img src="/assets/icons/Shuffle.svg" alt="Shuffle" />
      </button>
      <button className={styles.controlButton} onClick={onSkipBackward} title="-10 сек">
        <img src="/assets/icons/SkipBack.svg" alt="-10s" />
      </button>
      <button className={`${styles.controlButton} ${styles.play}`} onClick={onPlayPause}>
        <img src="/assets/icons/button.svg" alt={isPlaying ? 'Pause' : 'Play'} />
      </button>
      <button className={styles.controlButton} onClick={onSkipForward} title="+10 сек">
        <img src="/assets/icons/SkipForward.svg" alt="+10s" />
      </button>
      <button className={`${styles.controlButton} ${repeatMode !== 'off' ? styles.active : ''}`} onClick={onRepeat}>
        <img src="/assets/icons/Repeat.svg" alt="Repeat" />
      </button>
    </div>
  );
};

export default PlayerControls;