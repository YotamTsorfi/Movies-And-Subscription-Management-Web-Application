import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function SubscriptionWatched({ movieId }) {
    const [watchedMembers, setWatchedMembers] = useState([]);

    // useEffect(() => {
    //     const fetchWatchedMembers = async () => {
    //         try {
    //             const response = await axios.get(`http://your-api-url/movies/${movieId}/watchedMembers`);
    //             setWatchedMembers(response.data);
    //         } catch (error) {
    //             console.error('Error fetching watched members', error);
    //         }
    //     };

    //     fetchWatchedMembers();
    // }, [movieId]);

    return (
      <Card style={{ border: '2px solid black', marginBottom: '20px' }}>
        <CardContent>
         <h3>  SubscriptionWatched ...</h3>
          {/* // <ul>
          //     {watchedMembers.map(member => (
          //         <li key={member.id}>
          //             <Link to={`/members/${member.id}`}>
          //                 {member.name}
          //             </Link>
          //             {' watched on '}
          //             {new Date(member.dateWatched).toLocaleDateString()}
          //         </li>
          //     ))}
          // </ul> */}
          </CardContent>
      </Card>
    );
}

export default SubscriptionWatched;