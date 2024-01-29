const {MemberModel, MovieModel} = require('../models/subscriptionsModel');
const membersWSBL = require('../BLL/membersWSBLL');
const moviesWSBL = require('../BLL/moviesWSBLL');

const populateDatabase = async () => {
    try {
        const membersWS = await membersWSBL.getMembers();
        const moviesWS = await moviesWSBL.getMovies();

        const transformedMembers = membersWS.map(member => {
            return {
                Name: member.name,
                Email: member.email,
                City: member.address.city
            }
        });

        const transformedMovies = moviesWS.map(movie => { 
            return {
                Name: movie.name,
                Genres: movie.genres,
                Image: movie.image.medium,
                Premiered: movie.premiered
            }
        });

        await MemberModel.insertMany(transformedMembers);
        await MovieModel.insertMany(transformedMovies);

        console.log('Database has been populated successfully');
    } catch (err) {
        console.error('Failed to populate the database', err);
        console.log(err);
    }

}


module.exports = {
    populateDatabase
}