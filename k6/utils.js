import payloads from './payload.json';

export const getRandomNumber = (min, max) => {
    if (min >= max) {
        throw new Error('Invalid range: min should be less than max');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomPayload = () => {
    if (!Array.isArray(payloads) || payloads.length === 0) {
        throw new Error('No payloads available in payload.json');
    }
    const index = getRandomNumber(0, payloads.length - 1);
    return payloads[index];
};
