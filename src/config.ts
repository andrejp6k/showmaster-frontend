const env = process.env.NODE_ENV;

const config = {
  apiUrl: env === 'development' ? 'http://localhost:5173' : 'https://showmaster-ggb4j.ondigitalocean.app',
};

export default config;
