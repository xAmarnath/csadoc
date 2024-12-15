---
title: React.JS - Movie App Tutorial
---

# Movie App Tutorial

Welcome to this comprehensive guide on React best practices! We'll examine a Movie App implementation that demonstrates key React concepts and coding patterns. While we're keeping all code in a single file for learning purposes, we'll discuss important concepts and best practices along the way.

## What is React? 🤔

React is a JavaScript library for building user interfaces, particularly single-page applications where you need a fast, interactive user experience. Created and maintained by Facebook (now Meta), React has become one of the most popular front-end libraries in the world.

### Why Choose React? 🌟

1. **Component-Based Architecture**
2. **Virtual DOM**
3. **Declarative Syntax**
4. **Rich Ecosystem**

## Overview

### Project URL

https://github.com/xamarnath/react

Our Movie App is a single-page application that allows users to:

- View a list of movies
- Add new movies with details (name, year, rating)
- Delete existing movies
- All with a modern, responsive UI using Tailwind CSS

## Prerequisites

Before diving in, make sure you have:

- Basic understanding of JavaScript (Not Needed)
- Node.js installed on your computer
- A code editor (VS Code recommended)
- Basic familiarity with React concepts

## Understanding the Code Structure

Let's break down our `App.js` file section by section:

### 1. Imports and Component Setup

```jsx
import { useState, useEffect } from 'react';

function App() {
  // Component code here
}

export default App;
```

**What's happening here?**

- We import `useState` and `useEffect`, which are React Hooks.
- We make our main component, a function called `App`.
- We export `App` so other parts of our project can use it.

**What are Hooks?**

Hooks are special functions that let you use React features (like managing data and side effects) inside function components. They make your code simpler and easier to understand.

**`useState` Hook:**

`useState` lets your component "remember" information. It's like a variable that keeps track of a value and tells React to update the screen when that value changes.

```javascript
const [count, setCount] = useState(0);

// count: the current value (starts at 0)
// setCount: a function to change the value
```

Calling `setCount(5)` changes `count` to 5 and makes React update what the user sees.

**`useEffect` Hook:**

`useEffect` lets you do things _after_ React updates the screen. This is useful for fetching data, interacting with the browser, or setting timers.

```javascript
useEffect(() => {
  // This code runs after the component displays on the screen.
  document.title = 'New Title'; // Example: updating the page title
}, []); // The empty [] means this only runs ONCE after the first display.
```

You can tell `useEffect` to run again if certain values change by putting those values in the `[]`. For example, `[userId]` would make the effect run again whenever `userId` changes.

That's a basic overview of Hooks! They're fundamental to modern React development, making components more manageable and powerful.

### 2. State Management

```jsx
const [movies, setMovies] = useState([]); // State to store movie data
const [newMovie, setNewMovie] = useState({ name: '', year: '', rating: '' });
```

**Understanding State:**

- `movies`: An array that stores all our movies
- `newMovie`: An object that manages the form input values
- `useState`: A Hook that lets us add state to functional components

now for this too

**Why This Approach?**

- Separating movie list and form data makes our state management cleaner
- Using an object for `newMovie` keeps related form fields together
- Initial values (`[]` and `{}`) represent empty starting states

### 3. Data Fetching with useEffect

```jsx
useEffect(() => {
  fetch('http://localhost:3000/movies/stream')
    .then((response) => response.json())
    .then((data) => setMovies(data))
    .catch((err) => console.error('Error fetching movies:', err));
}, []);
```

**Breaking it Down:**

- `useEffect`: Runs after component renders
- Empty dependency array `[]`: Runs only once when component mounts
- `fetch`: Makes HTTP request to get movies
- `.then()`: Handles the response and updates state
- `.catch()`: Handles any errors that occur

**Best Practices Applied:**

- Using `useEffect` for side effects (data fetching)
- Error handling with `.catch()`
- Clean separation of data fetching from rendering logic

### 4. Form Input Handler

```jsx
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewMovie({ ...newMovie, [name]: value });
};
```

**How it Works:**

- Takes an event object (`e`) from input changes
- Destructures `name` and `value` from the event target
- Updates only the changed field while preserving other values

**Why This Pattern?**

- Dynamic handling of multiple form fields
- Maintains immutability by creating new state object
- Reduces code duplication with a single handler

### 5. Form Submission Handler

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:3000/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMovie),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Movie added successfully!');
      setNewMovie({ name: '', year: '', rating: '' }); // Reset form
      setMovies((prevMovies) => [...prevMovies, newMovie]); // Add new movie
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (err) {
    console.error('Error submitting movie:', err);
  }
};
```

**Key Concepts:**

- `async/await`: Makes asynchronous code more readable
- Error handling with `try/catch`
- Form reset after successful submission
- Optimistic UI update (adding movie to state immediately)

**Best Practices:**

- Preventing default form submission
- Proper error handling and user feedback
- Maintaining consistent state updates

### 6. Delete Handler

```jsx
const handleDelete = async (id) => {
  try {
    const response = await fetch('http://localhost:3000/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      alert('Movie deleted successfully!');
      setMovies((prevMovies) => prevMovies.filter(movie => movie._id !== id));
    } else {
      alert('Failed to delete movie.');
    }
  } catch (err) {
    console.error('Error deleting movie:', err);
  }
};
```

**Understanding the Delete Flow:**

- Takes movie ID as parameter
- Sends delete request to server
- Updates UI by filtering out deleted movie
- Handles success and error cases

**Best Practices:**

- Immediate UI feedback
- Optimistic updates for better UX
- Proper error handling

### 7. JSX and UI Structure

```jsx
return (
  <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-4 flex flex-col lg:flex-row items-start justify-center lg:space-x-8">
    {/* Form Section */}
    <div className="w-full lg:w-1/3 bg-gray-700 p-4 rounded-lg shadow-md">
      {/* Form content */}
    </div>

    {/* Movie List Section */}
    <div className="w-full lg:w-2/3">
      {/* List content */}
    </div>
  </div>
);
```

## Full HTMX Code

```jsx
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-4 flex flex-col lg:flex-row items-start justify-center lg:space-x-8">
      {/* Form to add a new movie */}
      <div className="w-full lg:w-1/3 bg-gray-700 p-4 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold mb-4 text-center text-cyan-400">🎬 Add Movie</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-gray-300 mb-1">
              Movie Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter movie name"
              value={newMovie.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="year" className="block text-xs font-medium text-gray-300 mb-1">
              Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              placeholder="Enter release year"
              value={newMovie.year}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="rating" className="block text-xs font-medium text-gray-300 mb-1">
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              placeholder="Enter rating (0-10)"
              value={newMovie.rating}
              onChange={handleInputChange}
              step="0.1"
              min="0"
              max="10"
              required
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 rounded focus:outline-none focus:ring-1 focus:ring-cyan-300 text-sm"
          >
            Add Movie
          </button>
        </form>
      </div>

      {/* Display list of movies */}
      <div className="w-full lg:w-2/3">
        <h1 className="text-xl font-semibold mb-4 text-center text-cyan-400">🎥 Movie List</h1>
        <ul className="space-y-3">
          {movies.map((movie) => (
            <li
              key={movie._id}
              className="bg-gray-800 p-3 rounded shadow flex items-center justify-between"
            >
              <div>
                <h3 className="text-sm font-medium text-cyan-400">{movie.name}</h3>
                <p className="text-gray-400 text-xs">Year: {movie.year}</p>
                <p className="text-gray-400 text-xs">Rating: {movie.rating}</p>
              </div>
              <button
                onClick={() => handleDelete(movie._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded text-xs focus:outline-none focus:ring-1 focus:ring-red-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
```

**UI Organization:**

- Clear separation of form and list sections
- Responsive layout using Tailwind CSS
- Consistent styling patterns
- Semantic HTML structure

**Best Practices:**

- Logical grouping of related UI elements
- Responsive design considerations
- Consistent class naming
- Accessibility considerations with proper labels

## Common React Patterns Used

1. **Controlled Components**

   - Form inputs are controlled by React state
   - Values and changes are managed through props and handlers

2. **Event Handling**

   - Consistent pattern for handling user interactions
   - Clear naming conventions for handler functions

3. **State Updates**

   - Immutable state updates using spread operator
   - Functional updates for state that depends on previous value

4. **Error Handling**
   - Try/catch blocks for async operations
   - User-friendly error messages
   - Console logging for debugging

## Tips for Working with This Code

1. **State Management**

   - Always use `setMovies` and `setNewMovie` for state updates
   - Never modify state directly
   - Use the functional update pattern when new state depends on old state

2. **Form Handling**

   - Always prevent default form submission
   - Validate input data before submission
   - Clear form after successful submission

3. **API Calls**

   - Handle all possible response states
   - Implement proper error handling
   - Show loading states when appropriate

4. **UI Updates**
   - Keep UI in sync with state
   - Provide immediate feedback for user actions
   - Maintain consistent styling

## Common Pitfalls to Avoid

1. **State Updates**

```jsx
// ❌ Wrong
movies.push(newMovie);

// ✅ Correct
setMovies([...movies, newMovie]);
```

2. **Async Error Handling**

```jsx
// ❌ Wrong
fetch('/api').then(res => res.json());

// ✅ Correct
fetch('/api')
  .then(res => res.json())
  .catch(err => console.error(err));
```

3. **Form Validation**

```jsx
// ❌ Wrong
const handleSubmit = () => {
  // Submit without checking
}

// ✅ Correct
const handleSubmit = () => {
  if (!newMovie.name.trim()) return;
  // Continue with submission
}
```

## Next Steps for Improvement

While keeping the code in a single file works for learning, here are some future improvements to consider:

1. **Add Loading States**

   - Show loading indicators during API calls
   - Disable buttons during operations

2. **Enhance Error Handling**

   - More specific error messages
   - Better error UI components

3. **Add Input Validation**

   - Validate form inputs before submission
   - Show validation messages to users

4. **Improve User Feedback**
   - Replace alerts with toast notifications
   - Add confirmation dialogs for deletions

Remember: While we've kept everything in one file for this tutorial, in a real application, you'd want to break these components and functions into separate files for better maintainability and reusability.

Happy coding! 🚀

## Full Code

```jsx
import { useState, useEffect } from 'react';

function App() {
  const [movies, setMovies] = useState([]); // State to store movie data
  const [newMovie, setNewMovie] = useState({ name: '', year: '', rating: '' }); // State for new movie inputs

  // Fetch movies via fetch API
  useEffect(() => {
    fetch('http://localhost:3000/movies/stream')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error('Error fetching movies:', err));
  }, []);

  // Handle input changes for the new movie form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  // Submit a new movie
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Movie added successfully!');
        setNewMovie({ name: '', year: '', rating: '' }); // Reset form
        setMovies((prevMovies) => [...prevMovies, newMovie]); // Add new movie to state
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error('Error submitting movie:', err);
    }
  };

  // Delete a movie
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        alert('Movie deleted successfully!');
        setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id)); // Remove movie from state
      } else {
        alert('Failed to delete movie.');
      }
    } catch (err) {
      console.error('Error deleting movie:', err);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-4 flex flex-col lg:flex-row items-start justify-center lg:space-x-8">
      {/* Form to add a new movie */}
      <div className="w-full lg:w-1/3 bg-gray-700 p-4 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold mb-4 text-center text-cyan-400">🎬 Add Movie</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-gray-300 mb-1">
              Movie Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter movie name"
              value={newMovie.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="year" className="block text-xs font-medium text-gray-300 mb-1">
              Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              placeholder="Enter release year"
              value={newMovie.year}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="rating" className="block text-xs font-medium text-gray-300 mb-1">
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              placeholder="Enter rating (0-10)"
              value={newMovie.rating}
              onChange={handleInputChange}
              step="0.1"
              min="0"
              max="10"
              required
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 rounded focus:outline-none focus:ring-1 focus:ring-cyan-300 text-sm"
          >
            Add Movie
          </button>
        </form>
      </div>

      {/* Display list of movies */}
      <div className="w-full lg:w-2/3">
        <h1 className="text-xl font-semibold mb-4 text-center text-cyan-400">🎥 Movie List</h1>
        <ul className="space-y-3">
          {movies.map((movie) => (
            <li
              key={movie._id}
              className="bg-gray-800 p-3 rounded shadow flex items-center justify-between"
            >
              <div>
                <h3 className="text-sm font-medium text-cyan-400">{movie.name}</h3>
                <p className="text-gray-400 text-xs">Year: {movie.year}</p>
                <p className="text-gray-400 text-xs">Rating: {movie.rating}</p>
              </div>
              <button
                onClick={() => handleDelete(movie._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded text-xs focus:outline-none focus:ring-1 focus:ring-red-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

```
