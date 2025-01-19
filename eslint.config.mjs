
import globals from "globals";
import pluginJs from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  // Base configuration for all JavaScript and TypeScript files
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        ...globals.browser,
        "process" : "readonly"
      }, // Add browser globals
    },
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "no-console": "warn",
      "no-undef": "error",
    },
  },

  // Specific overrides for JavaScript files
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },

  // TypeScript-specific configurations
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser, // Use TypeScript parser for .ts files
    },
    plugins: {
      "@typescript-eslint": tsPlugin, // Use TypeScript plugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules, // Use recommended rules from TypeScript plugin
    },
  },

  // Ignore unnecessary directories
  {
    ignores: ["**/node_modules/**", "**/dist/**"],
  },

  // Use the recommended configuration from @eslint/js
  pluginJs.configs.recommended,
];
















// // eslint.config.mjs
// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";


// export default [
//   {files: ["**/*.{js,mjs,cjs,ts}"]},
//   {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
//   {languageOptions: { globals: globals.browser }},
//   {
//     rules: {
//       eqeqeq: "off",
//       "no-unused-vars": "error",
//       "no-unused-expressions":"error",
//       "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
//       "no-console":"warn",
//       "no-undef":"error",
//     },
//   },
//   {
//     ignores: ["**/node_modules/**", "**/dist/**"]
// },
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
// ];

// const prettierRecommended = require('eslint-plugin-prettier/recommended');

// module.exports = [
//   // Add other configurations if needed
//   prettierRecommended,
// ];
