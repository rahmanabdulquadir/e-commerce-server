import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-console": "warn",
      "prefer-const": "error",
    },
  },
  {
    ignores: [".env", "**/dist/", "**/node_modules/"],
  }
);
