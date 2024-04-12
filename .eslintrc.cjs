module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "react-refresh",
    "sort-exports",
    "simple-import-sort",
    "unused-imports",
    "import",
  ],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "unused-imports/no-unused-imports": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-vars": [
      "warn",
      // we're ignoring unused vars & args with `_` prefix
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
      },
    ],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Packages:
          // react-packages,
          // packages starting with `@`,
          // any other imports not belongs to any condition (other packages)
          ["^react", "^@", "^\\w"],

          // Side effect imports from dependencies.
          ["^\\u0000[^./]"],

          // Lynn absolute imports.
          ["^@room"],

          // Side effect imports within the project.
          ["^\\u0000\\./", "^\\u0000\\.\\./"],

          // parent imports. (`../../file`),
          // sibling imports (`..` or `../`)
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],

          // Relative imports:
          // subdirectories (./folder/file),
          // hidden directories (.folder/file) or hidden files (.file),
          // current directory (. or ./)
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],

          // Style imports.
          ["^.+\\.?(css|scss)$"],
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["index.ts"],
      rules: {
        "sort-exports/sort-exports": "error",
        "import/export": "error",
      },
    },
  ],
};
