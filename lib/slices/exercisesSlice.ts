import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { API_ENDPOINTS, STORAGE_KEYS } from "../constants";

// Types
export interface Exercise {
  _id?: string;
  id?: number;
  categoryId?: string;
  equipment: string;
  gifUrl: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}

export interface ExercisesState {
  exercises: Exercise[];
  isLoading: boolean;
  error: string | null;
  isAdding: boolean;
  addError: string | null;
  isEditing: boolean;
  editError: string | null;
}

// Helper function to get token
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  }
  return null;
};

// Async thunks
export const fetchExercises = createAsyncThunk(
  "exercises/fetchExercises",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const token = getToken();

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await fetch(
        `${API_ENDPOINTS.EXERCISES_BY_CATEGORY}?categoryId=${categoryId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch exercises");
      }

      return data;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const addExercise = createAsyncThunk(
  "exercises/addExercise",
  async (exerciseData: Exercise, { rejectWithValue }) => {
    try {
      const token = getToken();

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await fetch(API_ENDPOINTS.EXERCISES, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(exerciseData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to add exercise");
      }

      return data;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const editExercise = createAsyncThunk(
  "exercises/editExercise",
  async (
    {
      exerciseId,
      exerciseData,
    }: { exerciseId: string; exerciseData: Exercise },
    { rejectWithValue }
  ) => {
    try {
      const token = getToken();

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await fetch(`${API_ENDPOINTS.EXERCISES}/${exerciseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(exerciseData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to edit exercise");
      }

      return { id: exerciseId, data };
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

// Initial state
const initialState: ExercisesState = {
  exercises: [],
  isLoading: false,
  error: null,
  isAdding: false,
  addError: null,
  isEditing: false,
  editError: null,
};

// Slice
const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.addError = null;
      state.editError = null;
    },
    clearAddError: (state) => {
      state.addError = null;
    },
    clearEditError: (state) => {
      state.editError = null;
    },
    clearFetchError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch exercises
      .addCase(fetchExercises.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exercises = action.payload;
        state.error = null;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add exercise
      .addCase(addExercise.pending, (state) => {
        state.isAdding = true;
        state.addError = null;
      })
      .addCase(addExercise.fulfilled, (state, action) => {
        state.isAdding = false;
        state.exercises.push(action.payload);
        state.addError = null;
      })
      .addCase(addExercise.rejected, (state, action) => {
        state.isAdding = false;
        state.addError = action.payload as string;
      })
      // Edit exercise
      .addCase(editExercise.pending, (state) => {
        state.isEditing = true;
        state.editError = null;
      })
      .addCase(editExercise.fulfilled, (state, action) => {
        state.isEditing = false;
        const index = state.exercises.findIndex(
          (ex) => ex._id === action.payload.id
        );
        if (index !== -1) {
          state.exercises[index] = {
            ...state.exercises[index],
            ...action.payload.data,
          };
        }
        state.editError = null;
      })
      .addCase(editExercise.rejected, (state, action) => {
        state.isEditing = false;
        state.editError = action.payload as string;
      });
  },
});

export const { clearErrors, clearAddError, clearEditError, clearFetchError } =
  exercisesSlice.actions;

// Selectors
export const selectExercises = (state: RootState) => state.exercises.exercises;
export const selectExercisesLoading = (state: RootState) =>
  state.exercises.isLoading;
export const selectExercisesError = (state: RootState) => state.exercises.error;
export const selectIsAddingExercise = (state: RootState) =>
  state.exercises.isAdding;
export const selectAddExerciseError = (state: RootState) =>
  state.exercises.addError;
export const selectIsEditingExercise = (state: RootState) =>
  state.exercises.isEditing;
export const selectEditExerciseError = (state: RootState) =>
  state.exercises.editError;

export default exercisesSlice.reducer;
