const repository = require('../repository');

exports.post = async (req, res, next) => {
  try {
    const user = await repository.createUser(req.body.name, req.body.email, req.body.hashedPassword, req.body.isActive, req.body.role);
    if(!user) {
      return res.status(400).json({ message: "Creation failed"})
    }
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.get = async (req, res, next) => {
  try {
    const users = await repository.getAllUsers();
    if(!users) {
      return res.status(404).json({ message: "User not found" })
    }
    return res.status(200).json(users);
  } catch(err) {
    return res.status(500).json({ error: err.message })
  }
};
