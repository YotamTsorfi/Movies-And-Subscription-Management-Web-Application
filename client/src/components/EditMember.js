import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditMember() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [member, setMember] = useState({
        Name: '',
        Email: '',
        City: ''
    });

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const response = await axios.get(`http://localhost:4321/members/${id}`);
                setMember(response.data);
            } catch (error) {
                console.error(`Error fetching member with id ${id}`, error);
            }
        };

        fetchMember();
    }, [id]);

    const handleChange = (event) => {
        setMember({
            ...member,
            [event.target.name]: event.target.value
        });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:4321/members/${id}`, member);
            navigate('/subscriptions');
        } catch (error) {
            console.error(`Error updating member with id ${id}`, error);
        }
    };

    const handleCancel = () => {
        navigate('/subscriptions');
      };

    return (
        <div>
            <h2>Edit Member: {member.Name} </h2>
            Name: <input type="text" name="Name" value={member.Name} onChange={handleChange} />
            <br />
            Email: <input type="email" name="Email" value={member.Email} onChange={handleChange} />
            <br />
            City: <input type="text" name="City" value={member.City} onChange={handleChange} />
            <br /><br />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
}

export default EditMember;