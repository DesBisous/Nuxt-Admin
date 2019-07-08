const resolve = require('path').resolve;

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:prettier/recommended'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  settings: {
    'import/resolver': {
      nuxt: {
        extensions: ['.js', '.vue']
      }
    },
    // packages already included in nuxt or nuxt modules
    'import/core-modules': ['vue', 'vuex']
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': [
      'warning',
      'always',
      {
        js: 'never',
        vue: 'never'
      }
    ],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // for vuex state
          'acc', // for reduce accumulators
          'e' // for e.returnvalue
        ]
      }
    ],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js']
      }
    ],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'quote-props': 0,
    'eol-last': 0,
    'function-paren-newline': 0,
    'spaced-comment': 0,
    'no-tabs': 0,
    'class-methods-use-this': 0,
    'no-underscore-dangle': 0,
    'no-unused-expressions': 0,
    'max-len': 0,
    'no-unused-vars': 0,
    'object-shorthand': 1,
    'linebreak-style': 0,
    'no-irregular-whitespace': 1,
    'vue/no-parsing-error': 1,
    'import/no-unresolved': 1,
    'arrow-body-style': 1,
    'import/no-extraneous-dependencies': 1,
    'no-console': 0,
    'prefer-destructuring': 0,
    'no-eval': 0
  }
};
