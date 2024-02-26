import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function SubscriptionWatched({ movieId }) {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
      const fetchSubscriptions = async () => {
          try {
              const response = await axios.get(`http://localhost:4321/subscriptions/movie/${movieId}`);
              setSubscriptions(response.data);
          } catch (error) {
              console.error(`Error fetching subscriptions for movie with id ${movieId}`, error);
          }
      };

      fetchSubscriptions();
  }, [movieId]);

  return (
      <div>
          Subscriptions Watched
          {subscriptions.map(subscription => (
        <div key={subscription.MemberId}>
        <Link to={`/members/${subscription.MemberId}`}>{subscription.MemberName}</Link>
        , {new Date(subscription.date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
            })}
        </div>
            ))}
      </div>
  );
}

export default SubscriptionWatched;