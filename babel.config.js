// babel.config.js
module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
    // Jest에서만 ECMAScript 모듈을 처리하도록 `only` 옵션 추가
    only: ['src/**/*.js', 'tests/**/*.js'],
  };
  