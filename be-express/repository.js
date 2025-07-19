const { User } = require('./sequelize');

const createUser = async (name, email, hashedPassword, isActive, role) => {
  return await User.create({ name, email, hashedPassword, isActive, role })
}

const getAllUsers = async () => {
  return await User.findAll({ limit: 100 })
}

const getUserById = async (id) => {
  return await User.findByPk(id);
}

const updateUser = async (id, name, email, hashedPassword, isActive, role) => {
  const [affectedRows] = await User.update(
    { name, email, hashedPassword, isActive, role },
    { where: { id } }
  );
  return { changes: affectedRows };
}

const deleteUser = async (id) => {
  const deleted = await User.destroy({ where: { id } });
  return { changes: deleted };
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
