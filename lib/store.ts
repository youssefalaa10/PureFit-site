import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoriesReducer from "./slices/categoriesSlice";
import exercisesReducer from "./slices/exercisesSlice";
import foodsReducer from "./slices/foodsSlice";
import drinksReducer from "./slices/drinksSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    exercises: exercisesReducer,
    foods: foodsReducer,
    drinks: drinksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
