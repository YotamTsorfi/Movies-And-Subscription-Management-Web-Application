const express = require('express');
const permissionsFileBL = require('../BLL/permissionsFileBL');

const router = express.Router();

//http://localhost:4824/permissionsfile
router.route('/')
    .get(async (req, resp) => {
        const permissions = await permissionsFileBL.getAllPermissions();
        return resp.json(permissions);
    })
    .post(async (req, resp) => {
        const newPermission = req.body;
        await permissionsFileBL.addPermission(newPermission);
        return resp.status(201).json(newPermission);
    });

//http://localhost:4824/permissionsfile/userHasPermission?userId=1&permission=deleteUsers
router.get('/userHasPermission', async (req, res) => {
    try {
        const { userId, permission } = req.query;
        const hasPermission = await permissionsFileBL.userHasPermission(userId, permission);
        res.json({ hasPermission: hasPermission });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

//http://localhost:4824/permissionsfile/1
router.route('/:id')
    .get(async (req, resp) => {
        const id = req.params.id;
        const permission = await permissionsFileBL.getPermissionById(id);
        return resp.json(permission);
    })
    .put(async (req, resp) => {
        const id = req.params.id;
        const permission = req.body;
        await permissionsFileBL.updatePermission(id, permission);
        return resp.json(permission);
    })
    .delete(async (req, resp) => {
        const id = req.params.id;
        await permissionsFileBL.deletePermission(id);
        return resp.sendStatus(204);
    });


module.exports = router;