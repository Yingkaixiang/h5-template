const config = {
  development: {
    host: '',
    apiHost: '',
    appId: '',
  },
  test: {
    host: '',
    apiHost: '',
    appId: '',
  },
  production: {
    host: '',
    apiHost: '',
    appId: '',
  },
};

export default config[process.env.NODE_ENV];
