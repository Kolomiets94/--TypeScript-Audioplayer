import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setVolume } from '../../store/playerSlice';
import styles from './Player.module.scss';

const VolumeControl: React.FC = () => {
  const volume = useAppSelector(state => state.player.volume);
  const dispatch = useAppDispatch();
  const barRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const update = (e: MouseEvent | React.MouseEvent) => {
      if (barRef.current) {
        const rect = barRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        dispatch(setVolume(Math.min(1, Math.max(0, x / rect.width))));
      }
    };
    update(e);
    const onMove = (e: MouseEvent) => update(e);
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  return (
    <div className={styles.volume}>
      <img src="/assets/icons/volume.svg" alt="Volume" />
      <div ref={barRef} className={styles.volumeBar} onMouseDown={handleMouseDown}>
        <div className={styles.volumeProgress} style={{ width: `${volume * 100}%` }} />
        <div className={styles.volumeKnob} style={{ left: `${volume * 100 - 6}px` }} />
      </div>
      <span>{Math.round(volume * 100)}%</span>
    </div>
  );
};

export default VolumeControl;