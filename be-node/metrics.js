const client = require('prom-client');

client.collectDefaultMetrics()

const requestCounter = new client.Counter({
  name: 'node_http_requests_total',
  help: 'Total number of requests',
  labelNames: ['method', 'endpoint', 'status_code'],
});

module.exports = { client, requestCounter };