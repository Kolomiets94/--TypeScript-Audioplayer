import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { tracks as initialTracks } from '../data/tracks';

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

interface TracksState {
  tracks: Track[];
  favorites: number[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
}

const initialState: TracksState = {
  tracks: initialTracks,
  favorites: initialTracks.filter(t => t.liked).map(t => t.id),
  searchQuery: '',
  loading: false,
  error: null,
  page: 1,
  hasMore: false,
};

export const fetchTracks = createAsyncThunk('tracks/fetchTracks', async (page: number) => {
  try {
    const data = await api.getTracks();
    return { tracks: data, page, hasMore: false };
  } catch {
    return { tracks: initialTracks, page: 1, hasMore: false };
  }
});

export const fetchFavorites = createAsyncThunk('tracks/fetchFavorites', async () => {
  try {
    const data = await api.getFavorites();
    return data.map((t: any) => t.id);
  } catch {
    return initialTracks.filter(t => t.liked).map(t => t.id);
  }
});

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const track = state.tracks.find(t => t.id === id);
      if (track) {
        track.liked = !track.liked;
        if (track.liked) {
          if (!state.favorites.includes(id)) state.favorites.push(id);
        } else {
          state.favorites = state.favorites.filter(fid => fid !== id);
        }
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.loading = false;
        const { tracks: newTracks, page, hasMore } = action.payload;
        if (page === 1) state.tracks = newTracks;
        else state.tracks = [...state.tracks, ...newTracks];
        state.page = page;
        state.hasMore = hasMore ?? false;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      })
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<number[]>) => {
        state.favorites = action.payload;
        state.tracks.forEach(t => { t.liked = action.payload.includes(t.id); });
      });
  },
});

export const { toggleLike, setSearchQuery } = tracksSlice.actions;
export default tracksSlice.reducer;