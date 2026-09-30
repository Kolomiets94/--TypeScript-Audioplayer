import React, { useEffect } from 'react';
import PlayerControls from './PlayerControls';
import VolumeControl from './VolumeControl';
import ProgressBar from './ProgressBar';
import { Track } from '../TrackList/TrackItem';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setCurrentTrack, setIsPlaying, setQueue, setQueueIndex } from '../../store/playerSlice';
import { useAudio } from '../../hooks/useAudio';
import styles from './Player.module.scss';

interface PlayerProps {
  track: Track;
  tracks: Track[];
  onTrackChange: (id: number) => void;
  onLike: (id: number) => void;
}

const Player: React.FC<PlayerProps> = ({ track, tracks, onTrackChange, onLike }) => {
  const dispatch = useAppDispatch();
  const { isPlaying, currentTime, duration } = useAppSelector((state) => state.player);
  const { seek, skipForward, skipBackward } = useAudio();

  useEffect(() => {
    const queue = tracks.map((item) => ({ ...item, id: String(item.id) }));
    const index = Math.max(0, tracks.findIndex((item) => item.id === track.id));
    dispatch(setQueue(queue));
    dispatch(setQueueIndex(index));
    dispatch(setCurrentTrack(queue[index]));
  }, [dispatch, track.id, tracks]);

  const changeTrack = (offset: number) => {
    const index = tracks.findIndex((item) => item.id === track.id);
    const next = tracks[index + offset];
    if (next) onTrackChange(next.id);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(track.id);
  };

  return (
    <div className={styles.player}>
      <div className={styles.trackInfo}>
        <img src={`${process.env.PUBLIC_URL || ''}/assets/images/${track.cover}`} alt={track.title} className={styles.cover} />
        <div className={styles.trackDetails}>
          <div className={styles.titleRow}>
            <h4>{track.title}</h4>
            <button
              className={`${styles.playerLikeButton} ${track.liked ? styles.active : ''}`}
              onClick={handleLikeClick}
              aria-label="Like"
            >
              <img src={`${process.env.PUBLIC_URL || ''}/assets/icons/heart.svg`} alt="" />
            </button>
          </div>
          <p>{track.artist}</p>
        </div>
      </div>

      <div className={styles.centerControls}>
        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={() => dispatch(setIsPlaying(!isPlaying))}
          onPrev={() => changeTrack(-1)}
          onNext={() => changeTrack(1)}
          onShuffle={() => dispatch(setCurrentTime(0))}
          onRepeat={() => seek(0)}
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
