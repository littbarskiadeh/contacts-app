import React from 'react';
import '../Styles/ListStyle.css';

const UserSummary = (props) => {    
    const user = props.user;
    
    return (
        <ul className='listStyle'>
            <li><strong>UserID - </strong>{user.id ? user.id: 'no user id'}</li>
            <li><strong>Username - </strong>{user.username ? user.username: 'no username'}</li>
            <li><strong>Name - </strong>{user.name ? user.name: 'no name'}</li>
            <li><strong>Email - </strong>{user.email ? user.email: 'no user email'}</li>
        </ul>
    )
}

export default UserSummary;