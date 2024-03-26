module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-expressions': ['error', { allowShortCircuit: true }], // 允许使用短路表达式 aa && bb
    'react/prop-types': ['error', { skipUndeclared: true }], // react组件需要定义propTypes   --- 暂时解除限制
    'react/no-unknown-property': ['error', { ignore: ['css'] }], // react组件禁止使用未知的DOM属性  --- 误伤，因为plugin:react/recommended 并不知道 emotion 框架的存在
    "no-param-reassign": ["error", { "props": false }], // 允许在函数内部修改函数参数
    'import/no-cycle': 'off', //全局禁用此类依赖性循环检查
    "react/jsx-no-bind": "off", // 防止在 JSX 中的回调函数中使用 bind 方法或是箭头函数
    "indent": 'off', // 代码缩进
    'max-len': 'off', // 代码单行长度检测
    "react/jsx-indent": "off", // jsx代码缩进
    "react/button-has-type": "off",
    "react/jsx-props-no-spreading": "off", // 允许在 JSX 中使用 spreading 属性
    "no-console" : "off"
  },
};
