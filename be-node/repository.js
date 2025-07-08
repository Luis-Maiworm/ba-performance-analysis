const { User } = require('./sequelize');

function createUser(name, email, hashed_password, is_active, role, callback) {
  User.create({ name, email, hashed_password, is_active, role })
    .then(user => callback(null, user))
    .catch(err => callback(err));
}

// function getAllUsers(callback) {
//   User.findAll()
//     .then(users => callback(null, users))
//     .catch(err => callback(err));
// }
// function getAllUsers(skip, limit, callback) {
function getAllUsers(callback) {
  // User.findAll()
  User.findAll({ limit: 10 })
    .then(users => callback(null, users))
    .catch(err => callback(err));
}

function getUserById(id, callback) {
  User.findByPk(id)
    .then(user => callback(null, user))
    .catch(err => callback(err));
}

function updateUser(id, name, email, hashed_password, is_active, role, callback) {
  User.update({ name, email, hashed_password, is_active, role }, { where: { id } })
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
