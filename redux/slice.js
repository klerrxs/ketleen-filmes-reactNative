import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { api } from "../api/axios";


const initialState ={
    valor: {},
    idDetail: 0
}

export const countSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
      returnHome: (state) => {
        state.valor = {}
    },
    idDetail: (state, action) => {
      state.idDetail = action.payload
  },
    },
    extraReducers: (builder) => {
        builder.addCase(getMovieDetails.fulfilled, (state, action) => {
            state.valor = action.payload;
        });
    }
});

export const data = (state) => state.data.valor;
export const id = (state) => state.data.idDetail;

export const { returnHome, idDetail } = countSlice.actions;

export const getMovieDetails = createAsyncThunk(
    "movie/getById",
    async (id) => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=ac57c76aa7b66833535f4b4aabe014f6&language=pt-BR`)
        console.log(response.data)
        return response.data;
      } catch (err) {
        console.log(err);
        throw new Error("Error to get all news from data base .");
      }
    }
  );

export default countSlice.reducer;