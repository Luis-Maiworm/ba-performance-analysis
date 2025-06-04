const UserInput = {
    input: { type: 'string', required: true },
};

const User = {
    username: { type: 'string', required: true, unique: true },
    email: { type: 'string', required: true, unique: true },
};

module.exports = { UserInput, User };
