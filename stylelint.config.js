export default {
    extends: ["stylelint-config-standard-scss"],
    plugins: ["stylelint-order"],
    rules: {
      "indentation": 2,
      "string-quotes": "double",
      "number-leading-zero": "always",
      "unit-allowed-list": ["em", "rem", "s", "px", "%", "vh", "vw"],
      "color-hex-length": "short",
  
      "scss/at-import-partial-extension": "always",
      "scss/dollar-variable-pattern": "^[_a-z]+[a-zA-Z0-9-]*$",
      "scss/at-mixin-pattern": "^[_a-z]+[a-zA-Z0-9-]*$",
      "scss/percent-placeholder-pattern": "^[_a-z]+[a-zA-Z0-9-]*$",
  
      "order/properties-alphabetical-order": true
    },
  };
  