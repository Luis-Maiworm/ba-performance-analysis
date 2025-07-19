const repository = require('../../repository');

exports.get = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = await repository.getUserById(id);
    if(!user) {
      return res.status(404).json( {error: "User not found"} )
    }
    return res.json(user);
  } catch(err) {
    return res.status(500).json({ error: err.message })
  }
}

exports.put = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const updated = await repository.updateUser(
      id,
      req.body.name,
      req.body.email,
      req.body.hashedPassword,
      req.body.isActive,
      req.body.role,
    );
    if (updated.changes === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(updated);
  } catch(err) {
    return res.status(500).json({ error: err.message })
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await repository.deleteUser(id);
    if(result.changes === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ message: "User deleted" })
  } catch(err) {
    return res.status(500).json({ error: err.message })
  }
};
