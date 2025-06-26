// loadtest-users.js
import http from 'k6/http';
import { check } from 'k6';
import { urls } from './urls.js';

export let options = {
  vus: 1,
  duration: '2s',
};

const service = __ENV.SERVICE;

if (!service || !urls[service]) {
  throw new Error(`Invalid or missing SERVICE environment variable. Available services: ${Object.keys(urls).join(', ')}`);
}

const url = urls[service];

export default function () {
  let res = http.get(`${url}/test`);
  check(res, {
    'status was 200': (r) => r.status === 200,
  });
}
