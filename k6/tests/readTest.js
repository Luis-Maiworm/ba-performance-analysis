import http from 'k6/http';
import { check } from 'k6';

import { URLS, ENDPOINT, READ_HEAVY_CONFIG as config, SERVICE } from '../configuration.js';
import { getRandomNumber } from '../utils.js';

const url = URLS[SERVICE];

export const options = config.options;

export default function () {

    const randomId = getRandomNumber(config.GET_RANGE[0], config.GET_RANGE[1]);
    const response_one = http.get(
        `${url}${ENDPOINT}/${randomId}`,
        { tags: config.tags }
    );

    check(response_one, { 'GET /users status 200': (r) => r.status === 200 });

    const response_all = http.get(
        `${url}${ENDPOINT}`,
        { tags: config.tags }
    );

    check(response_all, { 'GET /users status 200': (r) => r.status === 200 });

}   	