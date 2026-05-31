import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track } from '../types';

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  queue: Track[];
  queueIndex: number;
}

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  queue: [],
  queueIndex: -1,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setQueue: (state, action: PayloadAction<Track[]>) => {
      state.queue = action.payload;
    },
    setQueueIndex: (state, action: PayloadAction<number>) => {
      state.queueIndex = action.payload;
      if (state.queue[action.payload]) {
        state.currentTrack = state.queue[action.payload];
        state.currentTime = 0;
      }
    },
    nextTrack: (state) => {
      if (state.queueIndex < state.queue.length - 1) {
        state.queueIndex++;
        state.currentTrack = state.queue[state.queueIndex];
        state.currentTime = 0;
      }
    },
    previousTrack: (state) => {
      if (state.queueIndex > 0) {
        state.queueIndex--;
        state.currentTrack = state.queue[state.queueIndex];
        state.currentTime = 0;
      }
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  setQueue,
  setQueueIndex,
  nextTrack,
  previousTrack,
  togglePlay,
} = playerSlice.actions;

export default playerSlice.reducer;