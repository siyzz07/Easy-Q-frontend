<<<<<<< HEAD
# Easy-Q-frontend
This is the frontend of Easy Q, a modern web application for booking management. Built with React and TypeScript, the application provides a responsive and user-friendly interface for both customers and vendors.
Easy Q – Frontend

Easy Q is a modern web application frontend for managing bookings efficiently. This project provides a clean, responsive, and user-friendly interface for customers, vendors, and admins, ensuring smooth interaction and easy access to all functionalities of the booking system.

The frontend is built with React and TypeScript, following best practices for maintainable, scalable, and type-safe code. Tailwind CSS is used for styling, providing a modern and responsive design that works seamlessly on desktops, tablets, and mobile devices.

Features

User Authentication:
Separate login and signup flows for customers, vendors, and admins with role-based UI rendering.

Dynamic and Interactive Forms:
Input forms include validations, password visibility toggles, and intuitive user interactions to improve user experience.

Role-Based Access Control (RBAC):
UI elements and routes are displayed based on the user role, ensuring that users only see features relevant to them.

Responsive Design:
Fully responsive layout using Tailwind CSS for a polished look across all devices.

Tab-Based Navigation:
Switch easily between different user types (e.g., Customer / Vendor) for login or signup without leaving the page.

Reusable Components:
Forms, buttons, and UI elements are modular and reusable, reducing duplication and improving maintainability.

Seamless Backend Integration:
Connects with a Node.js/Express backend through REST APIs, enabling real-time interaction with MongoDB for persistent data storage.

Professional UI/UX:
Emphasis on usability, accessibility, and consistent styling across the application.
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
>>>>>>> f2c3a96 (basic setup)
