export const SERVICE = __ENV.SERVICE;

if (!SERVICE) {
  throw new Error(`Invalid or missing SERVICE environment variable. Available services: ${Object.keys(urls).join(', ')}`);
}

export const ENDPOINT = "/users"
 

export const URLS = {
    "python": "http://be_python:8001",
    "node": "http://be_node:8002",
    // "java": "http://be_java:8003"
}
