import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editMember } from '../actions/membersActions';

function EditMember() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const members = useSelector(state => state.members);
    const token = useSelector(state => state.user.token);

    const [member, setMember] = useState({
        Name: '',
        Email: '',
        City: ''
    });

    useEffect(() => {
      const memberToEdit = members.find(m => m._id === id);
      if (memberToEdit) {
          setMember(memberToEdit);
      }
  }, [id, members]);

    const handleChange = (event) => {
        setMember({
            ...member,
            [event.target.name]: event.target.value
        });
    };

    const handleUpdate = () => {
      dispatch(editMember(member, token));
      navigate('/subscriptions');
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