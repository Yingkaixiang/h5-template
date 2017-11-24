const config = {
  development: {
    host: 'dev.rela.me',
    appId: 'wx0e06c140296f0480',
  },
  test: {
    host: 'dev.rela.me',
    appId: 'wx0e06c140296f0480',
  },
  production: {
    host: 'www.rela.me',
    appId: 'wx0e06c140296f0480',
  },
};

export default config[process.env.NODE_ENV];
