const { User } = require('./sequelize');

function createUser(name, email, hashedPassword, isActive, role, callback) {
  User.create({ name, email, hashedPassword, isActive, role })
    .then(user => callback(null, user))
    .catch(err => callback(err));
}


function getAllUsers(callback) {
  User.findAll({ limit: 10 })
    .then(users => callback(null, users))
    .catch(err => callback(err));
}

function getUserById(id, callback) {
  User.findByPk(id)
    .then(user => callback(null, user))
    .catch(err => callback(err));
}

function updateUser(id, name, email, hashedPassword, isActive, role, callback) {
  User.update({ name, email, hashedPassword, isActive, role }, { where: { id } })
    .then(([affectedRows]) => callback(null, { changes: affectedRows }))
    .catch(err => callback(err));
}

function deleteUser(id, callback) {
  User.destroy({ where: { id } })
    .then(deleted => callback(null, { changes: deleted }))
    .catch(err => callback(err));
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
