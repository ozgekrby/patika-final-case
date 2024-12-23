import redisClient from './redis-client.js'

const convertToSeconds = (time) => {
    const unit = time.slice(-1);
    const value = parseInt(time.slice(0, -1), 10);
    switch (unit) {
        case 'd':
            return value * 24 * 60 * 60;
        case 'h':
            return value * 60 * 60;
        case 'm':
            return value * 60;
        case 's':
            return value;
        default:
            throw new Error('Invalid time format');
    }
};

const invalidateAuthToken = async (token) => {
    await redisClient.set(token, 'invalid', { EX: 10 });
};

export {
    invalidateAuthToken,
    convertToSeconds
}