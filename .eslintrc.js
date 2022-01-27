// Rules which have been enforced in configuration upgrades and flag issues in existing code.
// We need to consider whether to disable those rules permanently, or fix the issues.
const legacyCode = {
  "class-methods-use-this": "off",
  "constructor-super": "off",
  "default-param-last": "off",
  "import/extensions": "off",
  "import/first": "off",
  "import/newline-after-import": "off",
  "import/no-extraneous-dependencies": "off",
  "import/no-unresolved": "off",
  "import/no-useless-path-segments": "off",
  "import/order": "off",
  "import/prefer-default-export": "off",
  "jsx-a11y/alt-text": "off",
  "jsx-a11y/anchor-is-valid": "off",
  "jsx-a11y/click-events-have-key-events": "off",
  "jsx-a11y/interactive-supports-focus": "off",
  "jsx-a11y/no-noninteractive-element-interactions": "off",
  "jsx-a11y/role-supports-aria-props": "off",
  "lines-between-class-members": "off",
  "max-classes-per-file": "off",
  "no-await-in-loop": "off",
  "no-continue": "off",
  "no-else-return": "off",
  "no-extra-boolean-cast": "off",
  "no-import-assign": "off",
  "no-lonely-if": "off",
  "no-plusplus": "off",
  "no-prototype-builtins": "off",
  "no-restricted-syntax": "off",
  "no-this-before-super": "off",
  "operator-assignment": "off",
  "prefer-destructuring": "off",
  "prefer-object-spread": "off",
  "prefer-promise-reject-errors": "off",
  "react-hooks/exhaustive-deps": "off",
  "react-hooks/rules-of-hooks": "off",
  "react/button-has-type": "off",
  "react/destructuring-assignment": "off",
  "react/forbid-prop-types": "off",
  "react/function-component-definition": "off",
  "react/jsx-curly-brace-presence": "off",
  "react/jsx-filename-extension": "off",
  "react/jsx-no-useless-fragment": "off",
  "react/jsx-props-no-spreading": "off",
  "react/no-danger": "off",
  "react/no-deprecated": "off",
  "react/require-default-props": "off",
}

module.exports = {
  "extends": [
    "@wagtail/eslint-config-wagtail",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "env": {
    "jest": true,
    "browser": true,
  },
  "rules": {
    "no-underscore-dangle": ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] }],
    // note you must disable the base rule as it can report incorrect errors
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],

    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    'react/jsx-filename-extension': [
      "error",
      { extensions: ['.js', '.tsx'] },
    ],
    'import/extensions': [
      "error",
      'always',
      {
        ignorePackages: true,
        pattern: {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      },
    ],
    ...legacyCode,
  },
  "overrides": [
    {
      // Rules we don’t want to enforce for test and tooling code.
      "files": ["*.test.ts", "*.test.tsx", "*.test.js", "webpack.config.js"],
      "rules": {
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-var-requires": "off"
      }
    },
    {
      "files": ["docs/_static/**"],
      "globals": { "$": "readonly" }
    },
    {
      "files": ["wagtail/**/**"],
      "globals": {
        "$": "readonly",
        "addMessage": "readonly",
        "buildExpandingFormset": "readonly",
        "cancelSpinner": "readonly",
        "escapeHtml": "readonly",
        "insertRichTextDeleteControl": "readonly",
        "jQuery": "readonly",
        "jsonData": "readonly",
        "ModalWorkflow": "readonly",
        "DOCUMENT_CHOOSER_MODAL_ONLOAD_HANDLERS": "writable",
        "EMBED_CHOOSER_MODAL_ONLOAD_HANDLERS": "writable",
        "IMAGE_CHOOSER_MODAL_ONLOAD_HANDLERS": "writable",
        "QUERY_CHOOSER_MODAL_ONLOAD_HANDLERS": "writable",
        "SNIPPET_CHOOSER_MODAL_ONLOAD_HANDLERS": "writable"
      },
      "rules": {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "camelcase": [
          "error",
          {
            "allow": [
              "__unused_webpack_module",
              "__webpack_modules__",
              "__webpack_require__"
            ],
            "properties": "never"
          }
        ],
        "consistent-return": "off",
        "func-names": "off",
        "id-length": "off",
        "indent": "off",
        "key-spacing": "off",
        "new-cap": "off",
        "newline-per-chained-call": "off",
        "no-param-reassign": "off",
        "no-underscore-dangle": "off",
        "object-shorthand": "off",
        "prefer-arrow-callback": "off",
        "quote-props": "off",
        "space-before-function-paren": "off",
        "vars-on-top": "off"
      }
    }
  ]
}
