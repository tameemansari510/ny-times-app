import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import unusedImports from "eslint-plugin-unused-imports";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // Base ESLint configuration
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["**/index.ts"], // Exclude index.ts
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
      prettier: prettierPlugin, // Add Prettier plugin
    },
    rules: {
      // Unused Imports
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", argsIgnorePattern: "^_" },
      ],

      // Alphabetically Sort Imports
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",

      // TypeScript Unused Variables Rule
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Prettier Rules
      "prettier/prettier": "warn", // Run Prettier as an ESLint rule
    },
  },

  // Add eslint-config-prettier to disable conflicting rules
  eslintConfigPrettier,
];
