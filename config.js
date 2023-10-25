SystemJS.config({
  baseURL: 'https://unpkg.com/',
  defaultExtension: true,
  packages: {
    ".": {
      main: './app.js',
      defaultExtension: 'js'
    }
  },
  meta: {
    '*.js': {
      'babelOptions': {
        react: true
      }
    }
  },
  map: {
    'plugin-babel': 'systemjs-plugin-babel@latest/plugin-babel.js',
    'systemjs-babel-build': 'systemjs-plugin-babel@latest/systemjs-babel-browser.js',
    'react': 'react@18.2.0/umd/react.development.js',
    'react-dom': 'react-dom@18.2.0/umd/react-dom.development.js',
    'rxjs': 'rxjs@7.8.1/dist/bundles/rxjs.umd.min.js',
    'redux': 'redux@4.2.1/dist/redux.min.js'
  },
  transpiler: 'plugin-babel'
});

SystemJS.import('./app')
  .catch(console.error.bind(console));