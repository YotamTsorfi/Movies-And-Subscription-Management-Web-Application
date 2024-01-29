const membersWS = require('../DAL/membersWS');

const getMembers = async () => {
    try {
        const members = await membersWS.getMembers();
        console.log('Successfully fetched members');
        return members;
    } catch (err) {
        console.error('Failed to fetch members', err);
        throw err;
    }
}


module.exports = {getMembers};