import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { API_ENDPOINTS, STORAGE_KEYS, getApiEndpoint } from "../constants";

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
  // Map of categoryId -> Exercise[]
  exercises: Record<string, Exercise[]>;
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

      const response = await fetch(
        `${getApiEndpoint(API_ENDPOINTS.EXERCISES)}/${categoryId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || "Failed to fetch exercises" };
        }
        return rejectWithValue(
          errorData.message || "Failed to fetch exercises"
        );
      }

      const data = await response.json();
      return { categoryId, exercises: data as Exercise[] };
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

      if (!exerciseData.categoryId) {
        return rejectWithValue("categoryId is required to add an exercise");
      }

      const response = await fetch(getApiEndpoint(API_ENDPOINTS.EXERCISES), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(exerciseData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || "Failed to add exercise" };
        }
        return rejectWithValue(errorData.message || "Failed to add exercise");
      }

      const data = await response.json();
      return data as Exercise;
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

      const response = await fetch(
        `${getApiEndpoint(API_ENDPOINTS.EXERCISES)}/${exerciseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(exerciseData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || "Failed to edit exercise" };
        }
        return rejectWithValue(errorData.message || "Failed to edit exercise");
      }

      const data = await response.json();
      return data as Exercise;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

// Initial state
const initialState: ExercisesState = {
  exercises: {},
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
        const { categoryId, exercises } = action.payload as {
          categoryId: string;
          exercises: Exercise[];
        };
        state.exercises[categoryId] = exercises;
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
        const created = action.payload as Exercise;
        const categoryId = created.categoryId as string;
        if (!state.exercises[categoryId]) {
          state.exercises[categoryId] = [];
        }
        state.exercises[categoryId].push(created);
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
        const updated = action.payload as Exercise;
        const updatedId = updated._id || updated.id?.toString();
        if (!updatedId) {
          state.editError = null;
          return;
        }
        // Find and replace in whichever category currently holds this exercise
        let foundCategoryId: string | null = null;
        for (const [categoryId, list] of Object.entries(state.exercises)) {
          const idx = list.findIndex(
            (ex) => (ex._id || ex.id?.toString()) === updatedId
          );
          if (idx !== -1) {
            foundCategoryId = categoryId;
            // If category stays the same, replace in place
            list[idx] = { ...list[idx], ...updated };
            break;
          }
        }
        // If not found but the updated object has a categoryId, ensure it exists in that category
        const targetCategoryId =
          (updated.categoryId as string) || foundCategoryId;
        if (targetCategoryId) {
          if (!state.exercises[targetCategoryId]) {
            state.exercises[targetCategoryId] = [];
          }
          const targetIdx = state.exercises[targetCategoryId].findIndex(
            (ex) => (ex._id || ex.id?.toString()) === updatedId
          );
          if (targetIdx === -1) {
            state.exercises[targetCategoryId].push(updated);
          } else {
            state.exercises[targetCategoryId][targetIdx] = {
              ...state.exercises[targetCategoryId][targetIdx],
              ...updated,
            };
          }
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
export const selectExercisesState = (state: RootState) =>
  state.exercises.exercises;
export const selectExercisesByCategory =
  (categoryId?: string) => (state: RootState) =>
    categoryId ? state.exercises.exercises[categoryId] || [] : [];
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
