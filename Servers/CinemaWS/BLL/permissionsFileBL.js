const permissionsFile = require('../DAL/permissionsDALFile');

const getAllPermissions = async () => {
    try {
        return await permissionsFile.getAllPermissions();
    } catch (err) {
        console.error(err);
    }
}


const getPermissionById = async (id) => {
    try {
        return await permissionsFile.getPermissionById(id);
    } catch (err) {
        console.error(err);
    }
}

const addPermission = async (permission) => {
    try {
        return await permissionsFile.addPermission(permission);
    } catch (err) {
        console.error(err);
    }
}

const updatePermission = async (id, permission) => {
    try {
        return await permissionsFile.updatePermission(id, permission);
    } catch (err) {
        console.error(err);
    }
}

const deletePermission = async (id) => {
    try {
        return await permissionsFile.deletePermission(id);
    } catch (err) {
        console.error(err);
    }
}

const userHasPermission = async (userId, permission) => {
    try {
        // Get the user's permissions from the database
        const userPermissions = await permissionsFile.getPermissionById(userId);

        // Check if the user has the specified permission
        return userPermissions.permissions.includes(permission);
        
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    getAllPermissions,
    getPermissionById,
    addPermission,
    updatePermission,
    deletePermission,
    userHasPermission
};