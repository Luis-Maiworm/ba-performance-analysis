import http from "k6/http";
import { check } from "k6";

const payloads = JSON.parse(open("./payload.json"))

export const getRandomNumberInRange = (min, max) => {
    if (min >= max) {
        throw new Error("Invalid range: min should be less than max");
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomPayload = () => {
    if (!Array.isArray(payloads) || payloads.length === 0) {
        throw new Error("No payloads available in payload.json");
    }
    const index = getRandomNumberInRange(0, payloads.length - 1);
    const payload = JSON.stringify(payloads[index])
    return payload;
};

export const testRandomCrudEndpoint = (url, id) => {
    
      const rand = Math.random() * 100;

      if (rand < 20) {
        // GET all
        const res = http.get(`${url}`, {
           tags: {
            name: "get_all_users",
            url: "/users"
          }
        });
        check(res, { "read all": (r) => r.status === 200 });
      } else if (rand < 40) {
        // GET by ID
        const res = http.get(`${url}/${id}`,  {
          tags: {
            name: "get_user_by_id",
            url: "/users/:id"
          }
        });
        check(res, { "read one": (r) => r.status === 200 });
      } else if (rand < 60) {
        // POST
        const postPayload = getRandomPayload();
        const res = http.post(`${url}`, postPayload, {
          headers: { "Content-Type": "application/json" },
          tags: {
            name: "post_user",
            url: "/users"
          }
        });
        check(res, { "created": (r) => r.status === 201 || r.status === 200});
      } else if (rand < 80) {
        // PUT
        const putPayload = getRandomPayload();
        const res = http.put(`${url}/${id}`, putPayload, {
          headers: { "Content-Type": "application/json" },
          tags: {
            name: "put_user",
            url: "/users/:id"
          }
        });
        check(res, { "updated": (r) => r.status === 200 });
      } else {
        // DELETE
        const res = http.del(`${url}/${id}`, null, {
          tags: {
            name: "delete_user",
            url: "/users/:id"
          }
        });
        check(res, { "deleted": (r) => r.status === 200 || r.status === 204 || r.status === 404 });
      }
}