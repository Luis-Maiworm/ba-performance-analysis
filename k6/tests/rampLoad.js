import exec from 'k6/execution';

import { URLS, ENDPOINT, SERVICE } from '../const.js';
import { executeRandomEndpoint } from '../utils.js';

const url = URLS[SERVICE];
const BASE_URL = `${url}${ENDPOINT}`;


export const options = {
    stages: [
        { duration: "1m", target: 100},
        { duration: "3m", target: 100},
        { duration: "1m", target: 0},
    ],
    // vus: 10,
    // duration: "0.5m"
};

export default function () {
    const id = exec.scenario.iterationInTest;
    executeRandomEndpoint(BASE_URL, id)
}
