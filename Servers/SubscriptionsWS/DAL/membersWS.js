const axios = require('axios');

const getMembers = async () => {
    try {
        const members = await axios.get('https://jsonplaceholder.typicode.com/users');
        return members.data;
    } catch (err) {
        throw err;
    }
};


module.exports = {getMembers};