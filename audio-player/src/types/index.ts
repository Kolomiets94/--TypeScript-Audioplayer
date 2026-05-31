export interface User {
  username: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  added?: string;
  cover?: string;
  cover2x?: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
  user?: User;
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  queue: Track[];
  queueIndex: number;
}