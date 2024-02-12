const usersFile = require('../DAL/usersDALFile');


const getAllUsers = async () => {
    try {
        return await usersFile.getAllUsers();
    } catch (err) {
        console.error(err);
    }
}

const getUserById = async (id) => {
    try {
        return await usersFile.getUserById(id);
    } catch (err) {
        console.error(err);
    }
}

const addUser = async (user) => {
    try {
        return await usersFile.addUser(user);
    } catch (err) {
        console.error(err);
    }
}

const updateUser = async (id, user) => {
    try {
        return await usersFile.updateUser(id, user);
    } catch (err) {
        console.error(err);
    }
}

const deleteUser = async (id) => {
    try {
        return await usersFile.deleteUser(id);
    } catch (err) {
        console.error(err);
    }
}

const updateUserProperty = async (id, property, newValue) => {
    try {
        return await usersFile.updateUserProperty(id, property, newValue);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    updateUserProperty
};