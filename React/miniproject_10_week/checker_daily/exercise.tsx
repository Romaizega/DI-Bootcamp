// api/APi.ts

const BASE_URL = import.meta.env.VITE_BASE_URL

export async function getRecipes(query: string) {
  const url = `${BASE_URL}?s=${encodeURIComponent(query)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error API: ${response.status}`);
  }

  const data = await response.json();
  return data.meals
}

// app/ hooks.ts
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// app/ store.ts
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../features/dataSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// components/ DataFetcher.tsx
import { useEffect } from 'react';
import { fetchRecipes } from '../features/dataSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export function DataFetcher() {
  const dispatch = useAppDispatch();
  const { recipes, loading, error } = useAppSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchRecipes('chicken'));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipes.length) return <div>Not found</div>;

  return (
    <div>
      <h2>RECEPIES {recipes.length}</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.idMeal} style={{ marginBottom: '1rem' }}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} width="200" />
            <h4>{recipe.strMeal}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
}


// features/ dataSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { type Recipe } from '../types/types';

export const fetchRecipes = createAsyncThunk<Recipe[], string>(
  'data/fetchRecipes',
  async (query) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    return data.meals || [];
  }
);

interface DataState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  recipes: [],
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error request';
      });
  },
});

export default dataSlice.reducer;


//types/ types.ts
export type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export type RecipeApiResponse = {
  meals: Recipe[] | null;
}


// App.tsx

import './App.css'
import {DataFetcher} from './components/DataFetcher'

function App() {

  return (
    <>
      <h1></h1>
      <DataFetcher/>
    </>
  )
}

export default App


// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store ={store}>
    <App />
    </Provider>
  </StrictMode>,
)

