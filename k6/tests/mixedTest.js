import http from 'k6/http';
import { check } from 'k6';

import { URLS, ENDPOINT, MIXED_LOAD_CONFIG as config, SERVICE } from '../configuration.js';
import { getRandomNumber } from '../utils.js';
import payloads from '../payloads.json';

const url = URLS[SERVICE];

export const options = config.options;

export default function () {
    
    // GET ONE Endpoint
    const randomGetId = getRandomNumber(config.GET_RANGE[0], config.GET_RANGE[1]);
    const response_get = http.get(
        `${url}${ENDPOINT}/${randomGetId}`,
        { tags: config.tags }
    );
    check(response_get, { 'GET /users status 200': (r) => r.status === 200 });

    // POST Endpoint
    const randomPostIndex = getRandomNumber(0, payloads.length - 1);
    const postPayload = JSON.stringify(payloads[randomPostIndex]);
    const response_post = http.post(
        `${url}${ENDPOINT}`,
        postPayload,
        { headers: { 'Content-Type': 'application/json' }, tags: config.tags }
    );
    check(response_post, { 'POST /users status 201': (r) => r.status === 201 });

    // PUT Endpoint
    const randomPutId = getRandomNumber(config.PUT_RANGE[0], config.PUT_RANGE[1]);
    const putPayload = JSON.stringify({ name: `User${randomPutId}`, email: `user${randomPutId}@example.com` });
    const response_put = http.put(
        `${url}${ENDPOINT}/${randomPutId}`,
        putPayload,
        { headers: { 'Content-Type': 'application/json' }, tags: config.tags }
    );
    check(response_put, { 'PUT /users status 200': (r) => r.status === 200 });

    // GET ALL Endpoint
    const response_get_all = http.get(
        `${url}${ENDPOINT}`,
        { tags: config.tags }
    );
    check(response_get_all, { 'GET /users (all) status 200': (r) => r.status === 200 });

    // DELETE Endpoint
    const randomDeleteId = getRandomNumber(config.DELETE_RANGE[0], config.DELETE_RANGE[1]);
    const response_delete = http.del(
        `${url}${ENDPOINT}/${randomDeleteId}`,
        null,
        { tags: config.tags }
    );
    check(response_delete, { 'DELETE /users status 200': (r) => r.status === 200 });
}