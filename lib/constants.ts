// API Configuration
export const API_BASE_URL = "https://fit-pro-app.glitch.me";

// API Endpoints - Using local proxy routes to avoid CORS issues
export const API_ENDPOINTS = {
  LOGIN: "/api/auth/login", // Local proxy route
  CATEGORIES: "/api/categories", // Local proxy route
  EXERCISES: "/api/exercises", // Local proxy route
  EXERCISES_BY_CATEGORY: "/api/exercises", // Local proxy route for getting exercises by category
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  IS_AUTHENTICATED: "isAuthenticated",
} as const;

// Default Values
export const DEFAULT_CATEGORY = {
  thumbnail: "https://www.mindpumpmedia.com/hubfs/shutterstock_1067051933.png",
  programName: "Full Body Beginner",
  workoutName: "Total Body Toning",
  timeOf_FullProgram: "40 minutes",
  level: "Beginner",
  burnedCalories: 400,
  exercises: [
    {
      name: "Jumping Jacks",
      duration: "10 minutes",
      caloriesBurned: 100,
    },
    {
      name: "Push-ups",
      duration: "10 minutes",
      caloriesBurned: 50,
    },
    {
      name: "Squats",
      duration: "15 minutes",
      caloriesBurned: 80,
    },
    {
      name: "Plank",
      duration: "10 minutes",
      caloriesBurned: 60,
    },
    {
      name: "Mountain Climbers",
      duration: "15 minutes",
      caloriesBurned: 110,
    },
  ],
} as const;
