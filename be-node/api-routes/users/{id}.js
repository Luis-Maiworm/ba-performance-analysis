const repository = require('../../repository');
const { requestCounter } = require('../../metrics');

exports.get = function (req, res, next) {
  const id = parseInt(req.params.id, 10);
  repository.getUserById(id, (err, user) => {
    if (err) {
      requestCounter.inc({ method: 'GET', endpoint: '/users/{id}', status_code: 500 });
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      requestCounter.inc({ method: 'GET', endpoint: '/users/{id}', status_code: 404 });
      return res.status(404).json({ error: 'User not found' });
    }
    requestCounter.inc({ method: 'GET', endpoint: '/users/{id}', status_code: 200 });
    res.json(user);
  });
};

exports.put = function (req, res, next) {
  const id = parseInt(req.params.id, 10);
  repository.updateUser(id, req.body.name, req.body.email, req.body.hashed_password, req.body.is_active, req.body.role, (err, user) => {
    if (err) {
      requestCounter.inc({ method: 'PUT', endpoint: '/users/{id}', status_code: 500 });
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      requestCounter.inc({ method: 'PUT', endpoint: '/users/{id}', status_code: 404 });
      return res.status(404).json({ error: 'User not found' });
    }
    requestCounter.inc({ method: 'PUT', endpoint: '/users/{id}', status_code: 200 });
    res.json(user);
  });
};

exports.delete = function (req, res, next) {
  const id = parseInt(req.params.id, 10);
  repository.deleteUser(id, (err, deleted) => {
    if (err) {
      requestCounter.inc({ method: 'DELETE', endpoint: '/users/{id}', status_code: 500 });
      return res.status(500).json({ error: err.message });
    }
    if (!deleted) {
      requestCounter.inc({ method: 'DELETE', endpoint: '/users/{id}', status_code: 404 });
      return res.status(404).json({ error: 'User not found' });
    }
    requestCounter.inc({ method: 'DELETE', endpoint: '/users/{id}', status_code: 200 });
    res.json({ deleted: true });
  });
};
