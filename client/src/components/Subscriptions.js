import React, { useState } from 'react';
import AllMembers from './AllMembers';
import AddMember from './AddMember';

function Subscriptions() {
    const [menuOption, setMenuOption] = useState('All Members');

    const handleMenuChange = (option) => {
        setMenuOption(option);
    };

    return (
        <div style={{ border: '3px solid black', marginBottom: '20px' , width:'900px'}}> 
            <h3>Subscriptions</h3>
            <button onClick={() => handleMenuChange('All Members')}>All Members</button>
            <button onClick={() => handleMenuChange('Add Member')}>Add Member</button>
            <br/><br/>
            {menuOption === 'All Members' && <AllMembers />}
            {menuOption === 'Add Member' && <AddMember />}
        </div>
    );
}

export default Subscriptions;