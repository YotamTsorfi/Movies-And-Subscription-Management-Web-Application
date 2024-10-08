import React, { useState, useEffect } from 'react';
import AllMembers from './AllMembers';
import AddMember from './AddMember';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Subscriptions() {
    const [menuOption, setMenuOption] = useState('All Members');
    const navigate = useNavigate();
    const token = useSelector((state) => state.user.token);
    const permissions = useSelector((state) => state.user.permissions);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const handleMenuChange = (option) => {
        setMenuOption(option);
    };

    const resetMenuOption = () => {
        setMenuOption('All Members');
    };
    
    return (
        <div style={{ border: '3px solid black', marginBottom: '20px' , width:'900px'}}> 
            <h3>Subscriptions</h3>
            <button onClick={() => handleMenuChange('All Members')}>All Members</button>
            <button onClick={() => handleMenuChange('Add Member')}>Add Member</button>
            <button onClick={() => navigate('/main')}>Main</button>
            <br/><br/>
            {menuOption === 'All Members' && <AllMembers />}
            {menuOption === 'Add Member' && (
                permissions.includes('Create Subscriptions') ? (
                    <AddMember resetMenuOption={resetMenuOption} />
                ) : (
                    <>
                        {alert('You do not have permission to Create a member.')}
                        {handleMenuChange('All Members')}
                    </>
                )
            )}
        </div>
    );
}

export default Subscriptions;