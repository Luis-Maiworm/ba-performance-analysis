const repository = require('../../repository');

exports.get = function (req, res, next) {
  const id = parseInt(req.params.id, 10);
  repository.getUserById(id, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  });
};

exports.put = function (req, res, next) {
  const id = parseInt(req.params.id, 10);
  repository.updateUser(id, req.body.name, req.body.email, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  });
};

exports.delete = function (req, res, next) {
  const id = parseInt(req.params.id, 10);
  repository.deleteUser(id, (err, deleted) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.json({ deleted: true });
  });
};
