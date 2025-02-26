# To-Do List Project Setup

This project includes both a frontend and backend application. Please follow the instructions below to set up and run both parts of the application.

## Prerequisites
Before running the project, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/get-npm)

## Dependencies

### Backend Dependencies
The backend uses the following dependencies:
- `dotenv`: For managing environment variables
- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling tool

Development dependencies:
- `nodemon`: Automatically restarts your server during development when files are modified

### Frontend Dependencies
The frontend uses the following dependencies:
- `@chakra-ui/icons`: Chakra UI icons library
- `@chakra-ui/react`: Chakra UI component library for UI design
- `@emotion/react` & `@emotion/styled`: Emotion library for styling
- `framer-motion`: Animation library
- `next-themes`: For managing theme toggling (dark/light mode)
- `react`: React JS
- `react-dom`: React DOM
- `react-icons`: React icons
- `react-router-dom`: For routing in React
- `zustand`: State management library

Development dependencies:
- `@eslint/js`: JavaScript linting configuration for ESLint
- `@types/react` & `@types/react-dom`: TypeScript types for React
- `@vitejs/plugin-react`: Vite plugin for React support
- `eslint`: Linting tool
- `eslint-plugin-react`: ESLint plugin for React
- `eslint-plugin-react-hooks`: ESLint plugin for React Hooks
- `eslint-plugin-react-refresh`: React fast refresh plugin
- `globals`: Provides global variables for ESLint
- `vite`: Next-gen build tool and dev server

## Setting up the Backend

1. **Clone the repository**:
   ```bash
    git clone https://github.com/OrSekler/todo-list-app.git
    cd ToDo List
    ```

3. **Install the backend dependencies**:
    Navigate to the `backend` folder:
   ```bash
    cd backend
    npm install
   ```

5. **Set up your environment variables**:
    Create a `.env` file in the project main folder and add the following: your credentials.
   ```bash
    MONGO_URI= *your mongo uri*
    PORT=5000
   ```

7. **Start the backend development server**:
    Use `nodemon` to run the server:
   ```bash
    npm run dev
    ```
    The server should now be running on `http://localhost:5000`.

## Setting up the Frontend

1. **Install the frontend dependencies**:
    Navigate to the `frontend` folder:
   ```bash
    cd frontend
    npm install
    ```

3. **Start the frontend development server**:
   ```bash
    Run the following command:
    npm run dev
    ```
    The frontend should now be running on `http://localhost:5173`.

## Final Notes
- **.env** file: Make sure to update your `.env` file for both frontend and backend as needed (e.g., database URL, API keys).
- **Database**: Ensure your MongoDB instance is running and accessible.
