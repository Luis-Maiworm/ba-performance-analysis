const express = require('express');
const { initialize } = require('express-openapi');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { client } = require('./metrics');
const { sequelize } = require('./sequelize');

sequelize.sync();

const app = express();
app.use(express.json());

const apiDoc = YAML.load(path.join(__dirname, 'openapi.yaml'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDoc));

initialize({
  app,
  apiDoc: path.join(__dirname, 'openapi.yaml'),
  paths: path.join(__dirname, 'api-routes'),
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test erfolgreich' });
});

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`be-node läuft auf Port ${PORT}`);
});
