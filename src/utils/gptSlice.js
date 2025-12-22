import { createSlice } from '@reduxjs/toolkit'

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGPTSearch: false,
        gptMovieNames: null,
        tmdbMovieResults: null,
    },
    reducers: {
        toggleGPTSearch: (state) => {
            state.showGPTSearch = !state.showGPTSearch
        },
        addGptMovieResults: (state, action) => {
            state.gptMovieNames = action.payload.movieNames
            state.tmdbMovieResults = action.payload.tmdbMovieResults
        },
    },
})

export const { toggleGPTSearch, addGptMovieResults } = gptSlice.actions
export default gptSlice.reducer