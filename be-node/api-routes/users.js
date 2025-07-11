const repository = require('../repository');
const { requestCounter } = require('../metrics');

exports.post = function (req, res, next) {
  repository.createUser(req.body.name, req.body.email, req.body.hashedPassword, req.body.isActive, req.body.role,  (err, user) => {
    if (err) {
      requestCounter.inc({ method: 'POST', endpoint: '/users', is_success: "false" });
      return res.status(500).json({ error: err.message });
    }
    requestCounter.inc({ method: 'POST', endpoint: '/users', is_success: "true" });
    res.status(201).json(user);
  });
};

exports.get = function (req, res, next) {
  repository.getAllUsers((err, users) => {
    if (err) {
      requestCounter.inc({ method: 'GET', endpoint: '/users', is_success: "false" });
      return res.status(500).json({ error: err.message });
    }
    requestCounter.inc({ method: 'GET', endpoint: '/users', is_success: "true" });
    res.json(users)
  });
};
