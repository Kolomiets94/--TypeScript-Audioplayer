import { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import {
  setIsPlaying,
  setCurrentTime,
  setDuration,
  nextTrack,
} from '../store/playerSlice';

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useAppDispatch();
  
  const { currentTrack, isPlaying, volume } = useAppSelector((state) => state.player);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          dispatch(setCurrentTime(audioRef.current.currentTime));
        }
      });

      audioRef.current.addEventListener('loadedmetadata', () => {
        if (audioRef.current) {
          dispatch(setDuration(audioRef.current.duration));
        }
      });

      audioRef.current.addEventListener('play', () => {
        dispatch(setIsPlaying(true));
      });

      audioRef.current.addEventListener('pause', () => {
        dispatch(setIsPlaying(false));
      });

      audioRef.current.addEventListener('ended', () => {
        dispatch(nextTrack());
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(parseInt(currentTrack.id) % 8) + 1}.mp3`;
      audioRef.current.load();
      
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      dispatch(setCurrentTime(time));
    }
  }, [dispatch]);

  const skipForward = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 10,
        audioRef.current.duration
      );
    }
  }, []);

  const skipBackward = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
    }
  }, []);

  return {
    seek,
    skipForward,
    skipBackward,
  };
};