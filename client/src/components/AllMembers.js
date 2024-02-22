import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Member from './Member';

function AllMembers() {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('http://localhost:4321/members/');
                setMembers(response.data);
            } catch (error) {
                console.error('Error fetching members', error);
            }
        };

        fetchMembers();
    }, []);

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