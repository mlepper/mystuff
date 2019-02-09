module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      globalReturn: true,
      generators: false,
      objectLiteralDuplicateProperties: false,
      experimentalObjectRestSpread: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "eslint-plugin-react", "jest"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "react/jsx-uses-vars": "error",
    "react/jsx-uses-react": "error",
    "no-console": [
      "error",
      {
        allow: ["warn", "error"]
      }
    ],
    "react/prop-types": "off",
    "react/display-name": "off"
  }
};
