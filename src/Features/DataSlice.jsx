import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = "AIzaSyCJP3SdgAzM2gFQE-uQT3C2Wf884JPEhbI";

export const fetchMovieData = createAsyncThunk(
  "movie/fetchMovies",
  async (searchQuery = "latest movies", thunkAPI) => {
    try {
      let allVideos = [];
      let nextPageToken = '';
      const maxResults = 50; 
      const totalVideosNeeded = 60; 

      while (allVideos.length < totalVideosNeeded) {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
            searchQuery + ' official trailer'
          )}&type=video&maxResults=${Math.min(
            maxResults,
            totalVideosNeeded - allVideos.length
          )}&key=${apiKey}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`
        );

        allVideos = [...allVideos, ...response.data.items];
        nextPageToken = response.data.nextPageToken;

        if (!nextPageToken) break; 
      }

      const transformedData = allVideos.slice(0, totalVideosNeeded).map(item => ({
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
    error: null,
  },
  reducers: {},
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

export default MovieSlice.reducer;