export const SERVICE = __ENV.SERVICE;

if (!SERVICE) {
  throw new Error(`Invalid or missing SERVICE environment variable. Available services: ${Object.keys(urls).join(', ')}`);
}

export const ENDPOINT = "/users"
 

export const URLS = {
    "fastapi": "http://fastapi:8001",
    "express": "http://express:8002",
}
