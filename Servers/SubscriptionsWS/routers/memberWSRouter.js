const express = require('express');
const membersWSBLL = require('../BLL/membersWSBLL');

const router = express.Router();

// http://localhost:4321/membersWS 
router.route('/').get(async (req, resp) => {
    const members = await membersWSBLL.getMembers();
    return resp.json(members);
});

module.exports = router;