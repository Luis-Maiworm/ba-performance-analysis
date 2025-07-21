import exec from 'k6/execution';

import { URLS, ENDPOINT, SERVICE } from '../const.js';
import { executeRandomEndpoint } from '../utils.js';

const url = URLS[SERVICE];
const BASE_URL = `${url}${ENDPOINT}`;


export const options = {
    stages: [
        { duration: "30s", target: 50},
        { duration: "30s", target: 100},
        { duration: "30s", target: 200},
        { duration: "2m", target: 200},
        { duration: "30s", target: 100},
        { duration: "30s", target: 50},
        { duration: "30s", target: 0},
    ],
};

export default function () {
    const id = exec.scenario.iterationInTest;
    executeRandomEndpoint(BASE_URL, id)
}
