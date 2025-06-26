import http from 'k6/http';
import { check, sleep } from 'k6';
import { urls, usersPath } from './urls.js';

export const options = {
  vus: 20,
  duration: '60s',
};

const service = __ENV.SERVICE;

if (!service || !urls[service]) {
  throw new Error(`Invalid or missing SERVICE environment variable. Available services: ${Object.keys(urls).join(', ')}`);
}


const url = urls[service];

export default function () {
    // 1. CREATE
    const payload = JSON.stringify({ name: 'Test Item', value: 42 });
    const params = { headers: { 'Content-Type': 'application/json' } };
    const resCreate = http.post(`${url}${usersPath}`, payload, params);
    check(resCreate, {
        'created successfully': (r) => r.status === 201,
    });

    const itemId = JSON.parse(resCreate.body).id;

    // 2. READ
    const resRead = http.get(`${url}${usersPath}${itemId}`);
    check(resRead, {
        'read 200': (r) => r.status === 200,
    });

    // 3. UPDATE
    const updatePayload = JSON.stringify({ name: 'Updated Item', value: 99 });
    const resUpdate = http.put(`${url}${usersPath}${itemId}`, updatePayload, params);
    check(resUpdate, {
        'updated successfully': (r) => r.status === 200,
    });

    // 4. DELETE
    const resDelete = http.del(`${url}${usersPath}${itemId}`);
    check(resDelete, {
        'deleted successfully': (r) => r.status === 204,
    });

    sleep(1);
}
