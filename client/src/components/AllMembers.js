import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers } from '../actions/membersActions';
import Member from './Member';

function AllMembers() {    
    const dispatch = useDispatch();
    const members = useSelector(state => state.members);

    useEffect(() => {
        dispatch(fetchMembers());
      }, [dispatch]);

    return (
        <div style={{ border: '3px solid black', marginBottom: '20px' , width:'800px'}}>
            <h3>All Members</h3>
            {members.map(member => (
                <Member key={member._id} member={member} />
            ))}
        </div>
    );
}

export default AllMembers;