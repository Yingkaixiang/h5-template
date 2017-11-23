const config = {
  development: {
    host: 'dev.rela.me',
  },
};

export default config[process.env.NODE_ENV];
