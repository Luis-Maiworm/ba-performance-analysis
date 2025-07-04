const { User } = require('./sequelize');

function createUser(name, email, callback) {
  User.create({ name, email })
    .then(user => callback(null, user))
    .catch(err => callback(err));
}

function getAllUsers(callback) {
  User.findAll()
    .then(users => callback(null, users))
    .catch(err => callback(err));
}

function getUserById(id, callback) {
  User.findByPk(id)
    .then(user => callback(null, user))
    .catch(err => callback(err));
}

function updateUser(id, name, email, callback) {
  User.update({ name, email }, { where: { id } })
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
