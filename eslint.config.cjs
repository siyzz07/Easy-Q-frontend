// eslint.config.cjs
const typescriptParser = require("@typescript-eslint/parser");
const reactPlugin = require("eslint-plugin-react");

module.exports = [
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: typescriptParser, // pass the module, not string
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
    },
  },
];
