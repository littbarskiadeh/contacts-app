import React from 'react';
import User from './User'

const UserList = (props) => {    
    const usersArray = props.users;

    return (
        <div >
            {   usersArray.map((user, index) => {   return <User key={index} user={user}/>   })    }
        </div>        
    );
}

export default UserList;