const repository = require('../repository');

exports.post = function (req, res, next) {
  repository.createUser(req.body.name, req.body.email, req.body.hashedPassword, req.body.isActive, req.body.role,  (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(user);
  });
};

exports.get = function (req, res, next) {
  repository.getAllUsers((err, users) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(users)
  });
};
