module.exports = {
  // See https://github.com/wagtail/stylelint-config-wagtail for rules.
  extends: '@wagtail/stylelint-config-wagtail',
  rules: {
    // Would be valuable for strict BEM components but is too hard to enforce with legacy code.
    'no-descending-specificity': null,
    // Incompatible with the icon font setup – to be enforced once the icon font is removed.
    'font-family-no-missing-generic-family-keyword': null,
    'scss/no-global-function-names': null,
  },
};
