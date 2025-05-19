import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = "AIzaSyDxnitmNIyjKZB1F6IvduTLdJyByBXdD9I";

export const fetchMovieData = createAsyncThunk(
  "movie/fetchMovies",
  async (searchQuery = "latest movies", thunkAPI) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          searchQuery + ' official trailer'
        )}&type=video&maxResults=20&key=${apiKey}`
      );

      const transformedData = response.data.items.map(item => ({
        imdbID: item.id.videoId,
        Title: item.snippet.title,
        Year: new Date(item.snippet.publishedAt).getFullYear(),
        Poster: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
        Type: 'Movie',
        VideoURL: `https://www.youtube.com/embed/${item.id.videoId}`,
        snippet: item.snippet
      }));

      return transformedData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const MovieSlice = createSlice({
  name: "movieData",
  initialState: {
    list: [],
    status: "idle",
    search: '',
    error: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.search = action.payload;
      state.list = [] ;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieData.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchMovieData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchMovieData.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery } = MovieSlice.actions;
export default MovieSlice.reducer;