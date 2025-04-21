import dotenv from 'dotenv';

dotenv.config();

const config = {
    env: process.env.BASE_URL || 'http://localhost:3000',
}

export default config;