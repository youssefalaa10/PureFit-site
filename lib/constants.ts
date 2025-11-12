// API Configuration
export const API_BASE_URL = "https://fit-pro-app.glitch.me";

// Get the base URL for API endpoints
// In production (Vercel), use the production URL
// In development, use current origin (localhost)
const getAppBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side: check if we're in production
    const isProduction =
      window.location.hostname === "pure-fit.vercel.app" ||
      window.location.hostname.includes("vercel.app");
    if (isProduction) {
      return "https://pure-fit.vercel.app";
    }
    // Development: use current origin
    return window.location.origin;
  }
  // Server-side: use environment variable or default to production
  return process.env.NEXT_PUBLIC_APP_URL || "https://pure-fit.vercel.app";
};

// Function to get API endpoint (called at runtime)
export const getApiEndpoint = (path: string) => {
  const baseUrl = getAppBaseUrl();
  return `${baseUrl}${path}`;
};

// API Endpoints - Using proxy routes to avoid CORS issues
// These will be resolved at runtime using getApiEndpoint
export const API_ENDPOINTS = {
  LOGIN: "/api/auth/login",
  CATEGORIES: "/api/categories",
  EXERCISES: "/api/exercises",
  EXERCISES_BY_CATEGORY: "/api/exercises",
  FOODS: "/api/foods",
  DRINKS: "/api/drinks",
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
