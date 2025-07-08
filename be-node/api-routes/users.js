const repository = require('../repository');
const { requestCounter } = require('../metrics');

exports.post = function (req, res, next) {
  repository.createUser(req.body.name, req.body.email, req.body.hashed_password, req.body.is_active, req.body.role,  (err, user) => {
    if (err) {
      requestCounter.inc({ method: 'POST', endpoint: '/users', status_code: 500 });
      return res.status(500).json({ error: err.message });
    }
    requestCounter.inc({ method: 'POST', endpoint: '/users', status_code: 201 });
    res.status(201).json(user);
  });
};

exports.get = function (req, res, next) {
  repository.getAllUsers((err, users) => {
    if (err) {
      requestCounter.inc({ method: 'GET', endpoint: '/users', status_code: 500 });
      return res.status(500).json({ error: err.message });
    }
    requestCounter.inc({ method: 'GET', endpoint: '/users', status_code: 200 });
    res.json(users)
  });
};
