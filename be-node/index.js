const express = require('express');
const { initialize } = require('express-openapi');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const app = express();
app.use(express.json());

const apiDoc = YAML.load(path.join(__dirname, 'openapi.yaml'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDoc));


initialize({
  app,
  apiDoc: path.join(__dirname, 'openapi.yaml'),
  paths: path.join(__dirname, 'api-routes'),
});


app.get('/test', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`be-node läuft auf Port ${PORT}`);
});
