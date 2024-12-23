import dotenv from 'dotenv'

dotenv.config();

const configs = {
  uri: process.env.MONGO_URI,
};

if (!configs.uri) {
  throw new Error(`Environment variable for MONGO_URI is not defined.`);
}

export default configs;