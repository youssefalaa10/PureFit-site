# PureFit Website - Redux Toolkit Implementation

## Overview

This project implements Redux Toolkit for state management with authentication and categories management functionality. The application includes protected routes, API integration, and a clean, modern UI.

## Features Implemented

### 1. Authentication System

- **Login functionality** using the API endpoint: `https://fit-pro-app.glitch.me/auth/login`
- **Token management** with localStorage persistence
- **Protected routes** that redirect to login if not authenticated
- **Logout functionality** with proper state cleanup

### 2. Categories Management

- **Fetch all categories** from: `https://fit-pro-app.glitch.me/api/categories` (GET)
- **Add new categories** with authentication token (POST)
- **Real-time state updates** with Redux
- **Form validation** using Zod schema
- **Dynamic exercise management** (add/remove exercises)

### 3. Redux Toolkit Setup

- **Store configuration** with multiple slices
- **Async thunks** for API calls
- **Type-safe hooks** for Redux usage
- **Error handling** and loading states

## Project Structure

```
lib/
├── store.ts                 # Redux store configuration
├── hooks.ts                 # Typed Redux hooks
├── constants.ts             # API endpoints and configuration
└── slices/
    ├── authSlice.ts         # Authentication state management
    └── categoriesSlice.ts   # Categories state management

components/
├── providers/
│   └── ReduxProvider.tsx    # Redux provider wrapper
└── auth/
    └── ProtectedRoute.tsx   # Route protection component

app/
├── layout.tsx               # Root layout with Redux provider
├── login/page.tsx           # Login page with Redux integration
└── (dashboard)/
    └── dashboard/
        ├── layout.tsx       # Protected dashboard layout
        └── categories/
            └── page.tsx     # Categories management page
```

## API Integration

### Authentication

```typescript
// Login endpoint
POST https://fit-pro-app.glitch.me/auth/login
Body: {
  "email": "example@gmail.com",
  "password": "12345678"
}
Response: {
  "success": true,
  "message": "authentication successful",
  "token": "dfdasfdfsv.."
}
```

### Categories

```typescript
// Get all categories
GET https://fit-pro-app.glitch.me/api/categories

// Add category
POST https://fit-pro-app.glitch.me/api/categories
Headers: {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`
}
Body: {
  "thumbnail": "https://www.mindpumpmedia.com/hubfs/shutterstock_1067051933.png",
  "programName": "Full Body Beginner",
  "workoutName": "Total Body Toning",
  "timeOf_FullProgram": "40 minutes",
  "level": "Beginner",
  "burnedCalories": 400,
  "exercises": [
    {
      "name": "Jumping Jacks",
      "duration": "10 minutes",
      "caloriesBurned": 100
    }
    // ... more exercises
  ]
}
```

## Key Features

### 1. Protected Dashboard

- All dashboard routes are protected
- Automatic redirect to login if not authenticated
- Loading states during authentication checks

### 2. Categories Management

- **Search functionality** by program name or workout name
- **Filter by level** (Beginner, Intermediate, Advanced)
- **Add new categories** with dynamic exercise management
- **Form validation** with proper error handling
- **Real-time updates** in the UI

### 3. State Management

- **Centralized state** for authentication and categories
- **Persistent authentication** using localStorage
- **Loading and error states** for better UX
- **Type-safe Redux usage** with custom hooks

### 4. UI/UX Features

- **Modern design** with Tailwind CSS
- **Responsive layout** for mobile and desktop
- **Loading animations** and smooth transitions
- **Error handling** with user-friendly messages
- **Form validation** with real-time feedback

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Access the application:**
   - Open `http://localhost:3000`
   - Navigate to `/login` to test authentication
   - Use the dashboard to manage categories

## Usage

### Login

1. Navigate to `/login`
2. Enter email and password
3. Click "Sign In"
4. You'll be redirected to the dashboard upon successful authentication

### Categories Management

1. Navigate to `/dashboard/categories`
2. View existing categories
3. Use search and filter options
4. Click "Add Category" to create new categories
5. Fill in the form with program details and exercises
6. Submit to add the category

### Logout

1. Click on the user avatar in the top-right corner
2. Select "Logout" from the dropdown menu
3. You'll be redirected to the login page

## Technical Implementation

### Redux Store Structure

```typescript
{
  auth: {
    user: any | null,
    token: string | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string | null
  },
  categories: {
    categories: Category[],
    isLoading: boolean,
    error: string | null,
    isAdding: boolean,
    addError: string | null
  }
}
```

### Type Safety

- **Typed Redux hooks** (`useAppDispatch`, `useAppSelector`)
- **Zod schema validation** for forms
- **TypeScript interfaces** for all data structures
- **Strict type checking** throughout the application

### Error Handling

- **API error handling** with proper error messages
- **Form validation errors** with real-time feedback
- **Network error handling** with fallback messages
- **Authentication error handling** with user-friendly messages

## Dependencies

- **@reduxjs/toolkit** - Redux Toolkit for state management
- **react-redux** - React bindings for Redux
- **@hookform/resolvers** - Form validation with Zod
- **zod** - TypeScript-first schema validation
- **framer-motion** - Animation library
- **lucide-react** - Icon library
- **tailwindcss** - CSS framework

## Future Enhancements

1. **Edit/Delete functionality** for categories
2. **User profile management**
3. **More API endpoints** integration
4. **Advanced filtering** and sorting
5. **Bulk operations** for categories
6. **Export/Import** functionality
7. **Real-time updates** with WebSocket
8. **Offline support** with service workers
