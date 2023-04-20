module.exports = async () => {
  process.env.TZ = 'US/Hawaii';
};

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
