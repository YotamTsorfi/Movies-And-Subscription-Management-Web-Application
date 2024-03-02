const jsonfile = require('jsonfile');
const file = './data/users.json';


const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile(file, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        })
    })
}

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile(file, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            const user = data.find(u => u.id === id);
            if (!user) {
                reject(`User with id ${id} not found!`);
                return;
            }
            resolve(user);
        })
    })
}

const addUser = (user) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile(file, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            data.push(user);
            jsonfile.writeFile(file, data, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            })
        })
    })
}

const updateUser = (id, user) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile(file, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            const index = data.findIndex(u => u.id === id);
            if (index === -1) {
                reject(`User with id ${id} not found!`);
                return;
            }
            data[index] = user;
            jsonfile.writeFile(file, data, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            })
        })
    })
}

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile(file, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            const index = data.findIndex(u => u.id === id);
            if (index === -1) {
                reject(`User with id ${id} not found!`);
                return;
            }
            data.splice(index, 1);
            jsonfile.writeFile(file, data, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            })
        })
    })
}

const updateUserProperty = (id, property, newValue) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile(file, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            const user = data.find(u => u.id === id.toString());
            if (!user) {
                reject(`User with id ${id} not found!`);
                return;
            }
            user[property] = newValue;
            jsonfile.writeFile(file, data, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    });
}


module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    updateUserProperty
}