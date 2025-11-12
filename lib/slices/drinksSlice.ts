import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { API_ENDPOINTS, STORAGE_KEYS, getApiEndpoint } from "../constants";

// Types
export interface Drink {
  _id?: string;
  name: string;
  calories: number;
  protein: number;
  fats: number;
  image?: string;
}

export interface DrinksState {
  drinks: Drink[];
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
export const fetchDrinks = createAsyncThunk(
  "drinks/fetchDrinks",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();

      const response = await fetch(getApiEndpoint(API_ENDPOINTS.DRINKS), {
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
          errorData = { message: errorText || "Failed to fetch drinks" };
        }
        return rejectWithValue(errorData.message || "Failed to fetch drinks");
      }

      const data = await response.json();
      return data as Drink[];
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const addDrink = createAsyncThunk(
  "drinks/addDrink",
  async (drinkData: Partial<Drink>, { rejectWithValue }) => {
    try {
      const token = getToken();

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await fetch(getApiEndpoint(API_ENDPOINTS.DRINKS), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(drinkData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || "Failed to add drink" };
        }
        return rejectWithValue(errorData.message || "Failed to add drink");
      }

      const data = await response.json();
      return data as Drink;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const editDrink = createAsyncThunk(
  "drinks/editDrink",
  async (
    { drinkId, drinkData }: { drinkId: string; drinkData: Partial<Drink> },
    { rejectWithValue }
  ) => {
    try {
      const token = getToken();

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await fetch(
        `${getApiEndpoint(API_ENDPOINTS.DRINKS)}/${drinkId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(drinkData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || "Failed to edit drink" };
        }
        return rejectWithValue(errorData.message || "Failed to edit drink");
      }

      const data = await response.json();
      return data as Drink;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

// Initial state
const initialState: DrinksState = {
  drinks: [],
  isLoading: false,
  error: null,
  isAdding: false,
  addError: null,
  isEditing: false,
  editError: null,
};

// Slice
const drinksSlice = createSlice({
  name: "drinks",
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
      // Fetch drinks
      .addCase(fetchDrinks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDrinks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.drinks = action.payload;
        state.error = null;
      })
      .addCase(fetchDrinks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add drink
      .addCase(addDrink.pending, (state) => {
        state.isAdding = true;
        state.addError = null;
      })
      .addCase(addDrink.fulfilled, (state, action) => {
        state.isAdding = false;
        state.drinks.push(action.payload);
        state.addError = null;
      })
      .addCase(addDrink.rejected, (state, action) => {
        state.isAdding = false;
        state.addError = action.payload as string;
      })
      // Edit drink
      .addCase(editDrink.pending, (state) => {
        state.isEditing = true;
        state.editError = null;
      })
      .addCase(editDrink.fulfilled, (state, action) => {
        state.isEditing = false;
        const updated = action.payload;
        const index = state.drinks.findIndex(
          (drink) => drink._id === updated._id
        );
        if (index !== -1) {
          state.drinks[index] = updated;
        }
        state.editError = null;
      })
      .addCase(editDrink.rejected, (state, action) => {
        state.isEditing = false;
        state.editError = action.payload as string;
      });
  },
});

export const { clearErrors, clearAddError, clearEditError, clearFetchError } =
  drinksSlice.actions;

// Selectors
export const selectDrinks = (state: RootState) => state.drinks.drinks;
export const selectDrinksLoading = (state: RootState) => state.drinks.isLoading;
export const selectDrinksError = (state: RootState) => state.drinks.error;
export const selectIsAddingDrink = (state: RootState) => state.drinks.isAdding;
export const selectAddDrinkError = (state: RootState) => state.drinks.addError;
export const selectIsEditingDrink = (state: RootState) =>
  state.drinks.isEditing;
export const selectEditDrinkError = (state: RootState) =>
  state.drinks.editError;

export default drinksSlice.reducer;
