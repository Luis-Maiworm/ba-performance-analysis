import http from 'k6/http';
import { check } from 'k6';

const payloads = JSON.parse(open('./payload.json'))

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
    const payload = JSON.stringify(payloads[index])
    console.log('payloads:', payload);
    return payload;
};

export const executeRandomEndpoint = (url, id) => {
    
      const rand = Math.random() * 100;

      if (rand < 20) {
        // GET all
        const res = http.get(`${url}`);
        check(res, { 'read all': (r) => r.status === 200 });
      } else if (rand < 35) {
        // GET by ID
        const res = http.get(`${url}/${id}`);
        check(res, { 'read one': (r) => r.status === 200 });
      } else if (rand < 60) {
        // POST
        const postPayload = getRandomPayload();
        const res = http.post(`${url}`, postPayload, {
          headers: { 'Content-Type': 'application/json' },
        });
        check(res, { 'created': (r) => r.status === 201 });
      } else if (rand < 85) {
        // PUT
        const putPayload = getRandomPayload();
        const res = http.put(`${url}/${id}`, putPayload, {
          headers: { 'Content-Type': 'application/json' },
        });
        check(res, { 'updated': (r) => r.status === 200 });
      } else {
        // DELETE
        const res = http.del(`${url}/${id}`);
        check(res, { 'deleted': (r) => r.status === 200 || r.status === 204 || r.status === 404 }); // toleriert Zweitlöschung
      }
}