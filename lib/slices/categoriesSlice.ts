import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { API_ENDPOINTS, STORAGE_KEYS, getApiEndpoint } from "../constants";

// Types
export interface Exercise {
  name: string;
  duration: string;
  caloriesBurned: number;
}

export interface Category {
  id?: string;
  thumbnail?: string;
  programName?: string;
  workoutName?: string;
  timeOf_FullProgram?: string;
  level?: string;
  burnedCalories?: number;
  exercises?: Exercise[];
  createdAt?: string;
}

export interface CategoriesState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  isAdding: boolean;
  addError: string | null;
}

// Helper function to get token
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  }
  return null;
};

// Async thunks
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(getApiEndpoint(API_ENDPOINTS.CATEGORIES), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch categories");
      }

      return data;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (
    categoryData: {
      thumbnail: string;
      programName: string;
      workoutName: string;
      timeOf_FullProgram: string;
      level: string;
      burnedCalories: number;
      exercises: Exercise[];
    },
    { rejectWithValue }
  ) => {
    try {
      const token = getToken();

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await fetch(getApiEndpoint(API_ENDPOINTS.CATEGORIES), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to add category");
      }

      return data;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

// Initial state
const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
  isAdding: false,
  addError: null,
};

// Slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.addError = null;
    },
    clearAddError: (state) => {
      state.addError = null;
    },
    clearFetchError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add category
      .addCase(addCategory.pending, (state) => {
        state.isAdding = true;
        state.addError = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isAdding = false;
        state.categories.push(action.payload);
        state.addError = null;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isAdding = false;
        state.addError = action.payload as string;
      });
  },
});

export const { clearErrors, clearAddError, clearFetchError } =
  categoriesSlice.actions;

// Selectors
export const selectCategories = (state: RootState) =>
  state.categories.categories;
export const selectCategoriesLoading = (state: RootState) =>
  state.categories.isLoading;
export const selectCategoriesError = (state: RootState) =>
  state.categories.error;
export const selectIsAddingCategory = (state: RootState) =>
  state.categories.isAdding;
export const selectAddCategoryError = (state: RootState) =>
  state.categories.addError;

export default categoriesSlice.reducer;
