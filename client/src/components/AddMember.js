import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMember } from '../actions/membersActions';

function AddMember(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

    const handleSave = () => {
        dispatch(addMember(member));
        navigate('/subscriptions');
        window.location.reload();
    };

    const handleCancel = () => {
        props.resetMenuOption();
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