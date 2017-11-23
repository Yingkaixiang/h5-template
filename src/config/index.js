const config = {
  development: {
    host: 'dev.rela.me',
  },
  test: {
    host: 'dev.rela.me',
  },
  production: {
    host: 'www.rela.me',
  },
};

export default config[process.env.NODE_ENV];
