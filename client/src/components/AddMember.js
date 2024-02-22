import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddMember() {
    const nevigate = useNavigate();
    const [member, setMember] = useState({
        Name: '',
        Email: '',
        City: ''
    });

    const handleChange = (event) => {
        setMember({
            ...member,
            [event.target.name]: event.target.value
        });
    };

    const handleSave = async () => {
        try {
            await axios.post('http://localhost:4321/members/', member);
            nevigate('/subscriptions');
        } catch (error) {
            console.error('Error creating member', error);
        }
    };

    const handleCancel = () => {
        nevigate('/subscriptions');
    };

    return (
        <div>
            <h2>Add new member</h2>
            Name: <input type="text" name="Name" value={member.Name} onChange={handleChange} />
            <br />
            Email: <input type="email" name="Email" value={member.Email} onChange={handleChange} />
            <br />
            City: <input type="text" name="City" value={member.City} onChange={handleChange} />
            <br /><br />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
}

export default AddMember;