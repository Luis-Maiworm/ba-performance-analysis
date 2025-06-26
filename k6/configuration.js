export const SERVICE = __ENV.SERVICE;

if (!SERVICE) {
  throw new Error(`Invalid or missing SERVICE environment variable. Available services: ${Object.keys(urls).join(', ')}`);
}

export const ENDPOINT = "/users"


const DB_SIZE = 10000;

export const READ_HEAVY_CONFIG = {
    options: {
        vus: 10,
        duration: '30s',
    },
    tags: {
        test_type: 'read-heavy'
    },
    GET_RANGE: [1, DB_SIZE],
};

export const WRITE_HEAVY_CONFIG = {
    options: {
        vus: 1,
        duration: '2s',
    },
    tags: {
        test_type: 'write-heavy'
    },
    DELETE_RANGE: [1, 2000],
    PUT_RANGE: [2001, 4000],
};

export const MIXED_LOAD_CONFIG = {
    options: {
        vus: 1,
        duration: '2s',
    },
    tags: {
        test_type: 'mixed-load'
    },
    DELETE_RANGE: [2001, 4000],
    PUT_RANGE: [5001, 8000],
    GET_RANGE: [4001, DB_SIZE],
};    

export const URLS = {
    "python": "http://be_python:8001",
    "node": "http://be_node:8002",
    // "java": "http://be_java:8003"
}
