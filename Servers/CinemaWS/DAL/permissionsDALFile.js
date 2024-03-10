const path = require('path');
const jsonfile = require('jsonfile');
const file = path.join(__dirname, '..', 'data', 'permissions.json');

const getAllPermissions = () => {
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

const getPermissionById = (id) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile(file, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            const permission = data.find(p => p.userId === id);
            if (!permission) {
                reject(`Permission with id ${id} not found!`);
                return;
            }
            resolve(permission);
        })
    })
}

const addPermission = (permission) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile(file, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            data.push(permission);
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

const updatePermission = (id, permission) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile(file, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            const index = data.findIndex(p => p.userId === id);
            if (index === -1) {
                reject(`Permission with id ${id} not found!`);
                return;
            }
            data[index] = permission;
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

const deletePermission = (id) => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile(file, (err, permissions) => {
            if (err) {
                reject(err);
                return;
            }
            const index = permissions.findIndex(p => p.userId === id);
            if (index === -1) {
                reject(`Permission with id ${id} not found!`);
                return;
            }
            permissions.splice(index, 1);
            jsonfile.writeFile(file, permissions, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            })
        })
    })
}

module.exports = {
    getAllPermissions,
    getPermissionById,
    addPermission,
    updatePermission,
    deletePermission
}