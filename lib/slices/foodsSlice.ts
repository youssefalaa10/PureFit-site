import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { API_ENDPOINTS, STORAGE_KEYS, getApiEndpoint } from "../constants";

// Types
export interface Food {
  _id?: string;
  name: string;
  calories: number;
  protein: number;
  carbs?: number;
  fat?: number;
  image?: string;
}

export interface FoodsState {
  foods: Food[];
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
export const fetchFoods = createAsyncThunk(
  "foods/fetchFoods",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();

      const response = await fetch(getApiEndpoint(API_ENDPOINTS.FOODS), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || "Failed to fetch foods" };
        }
        return rejectWithValue(errorData.message || "Failed to fetch foods");
      }

      const data = await response.json();
      return data as Food[];
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const addFood = createAsyncThunk(
  "foods/addFood",
  async (foodData: Partial<Food>, { rejectWithValue }) => {
    try {
      const token = getToken();

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await fetch(getApiEndpoint(API_ENDPOINTS.FOODS), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(foodData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || "Failed to add food" };
        }
        return rejectWithValue(errorData.message || "Failed to add food");
      }

      const data = await response.json();
      return data as Food;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const editFood = createAsyncThunk(
  "foods/editFood",
  async (
    { foodId, foodData }: { foodId: string; foodData: Partial<Food> },
    { rejectWithValue }
  ) => {
    try {
      const token = getToken();

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await fetch(
        `${getApiEndpoint(API_ENDPOINTS.FOODS)}/${foodId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(foodData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || "Failed to edit food" };
        }
        return rejectWithValue(errorData.message || "Failed to edit food");
      }

      const data = await response.json();
      return data as Food;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

// Initial state
const initialState: FoodsState = {
  foods: [],
  isLoading: false,
  error: null,
  isAdding: false,
  addError: null,
  isEditing: false,
  editError: null,
};

// Slice
const foodsSlice = createSlice({
  name: "foods",
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
      // Fetch foods
      .addCase(fetchFoods.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.isLoading = false;
        state.foods = action.payload;
        state.error = null;
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add food
      .addCase(addFood.pending, (state) => {
        state.isAdding = true;
        state.addError = null;
      })
      .addCase(addFood.fulfilled, (state, action) => {
        state.isAdding = false;
        state.foods.push(action.payload);
        state.addError = null;
      })
      .addCase(addFood.rejected, (state, action) => {
        state.isAdding = false;
        state.addError = action.payload as string;
      })
      // Edit food
      .addCase(editFood.pending, (state) => {
        state.isEditing = true;
        state.editError = null;
      })
      .addCase(editFood.fulfilled, (state, action) => {
        state.isEditing = false;
        const updated = action.payload;
        const index = state.foods.findIndex((food) => food._id === updated._id);
        if (index !== -1) {
          state.foods[index] = updated;
        }
        state.editError = null;
      })
      .addCase(editFood.rejected, (state, action) => {
        state.isEditing = false;
        state.editError = action.payload as string;
      });
  },
});

export const { clearErrors, clearAddError, clearEditError, clearFetchError } =
  foodsSlice.actions;

// Selectors
export const selectFoods = (state: RootState) => state.foods.foods;
export const selectFoodsLoading = (state: RootState) => state.foods.isLoading;
export const selectFoodsError = (state: RootState) => state.foods.error;
export const selectIsAddingFood = (state: RootState) => state.foods.isAdding;
export const selectAddFoodError = (state: RootState) => state.foods.addError;
export const selectIsEditingFood = (state: RootState) => state.foods.isEditing;
export const selectEditFoodError = (state: RootState) => state.foods.editError;

export default foodsSlice.reducer;
