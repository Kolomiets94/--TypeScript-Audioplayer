import React, { useEffect } from 'react';
import PlayerControls from './PlayerControls';
import VolumeControl from './VolumeControl';
import ProgressBar from './ProgressBar';
import { Track } from '../TrackList/TrackItem';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setCurrentTrack, setIsPlaying, setQueue } from '../../store/playerSlice';
import { useAudio } from '../../hooks/useAudio';
import styles from './Player.module.scss';

interface PlayerProps {
  track: Track;
  onLike: (id: number) => void;
}

const Player: React.FC<PlayerProps> = ({ track, onLike }) => {
  const dispatch = useAppDispatch();
  const { isPlaying, currentTime, duration } = useAppSelector((state) => state.player);
  const { seek, skipForward, skipBackward } = useAudio();

  useEffect(() => {
    const playerTrack = {
      ...track,
      id: String(track.id),
    };
    dispatch(setCurrentTrack(playerTrack));
    dispatch(setQueue([playerTrack]));
  }, [dispatch, track]);

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
              <img src="/assets/icons/heart.svg" alt="" />
            </button>
          </div>
          <p>{track.artist}</p>
        </div>
      </div>

      <div className={styles.centerControls}>
        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={() => dispatch(setIsPlaying(!isPlaying))}
          onPrev={() => {}}
          onNext={() => {}}
          onShuffle={() => {}}
          onRepeat={() => {}}
          onSkipForward={skipForward}
          onSkipBackward={skipBackward}
        />
        <ProgressBar currentTime={currentTime} duration={duration} onSeek={seek} />
      </div>

      <div className={styles.mobileProgress}>
        <ProgressBar currentTime={currentTime} duration={duration} onSeek={seek} />
      </div>

      <div className={styles.actions}>
        <VolumeControl />
      </div>
    </div>
  );
};

export default Player;
