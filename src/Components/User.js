import React from 'react';
import '../Styles/ListStyle.css';

const User = (props) => {    
    const user = props.user;

    return (
            <ul className='listStyle'>
                <li><strong>UserID - </strong>{ user.id ? user.id: 'no user id'}</li>
                <li><strong>Username - </strong>{ user.username ? user.username: 'no username'}</li>
                <li><strong>Name - </strong>{user.name ? user.name: 'no name'}</li>
                <li><strong>Email - </strong>{user.email ? user.email: 'no user email'}</li>
                <li><strong>Street - </strong>{user.address && user.address.street ? user.address.street: 'no street name' }</li>
                <li><strong>Suite - </strong>{user.address && user.address.suite ? user.address.suite: 'no suite number' }</li>
                <li><strong>City - </strong>{user.address && user.address.city ? user.address.city: 'no city name' }</li>
                <li><strong>Zipcode - </strong>{user.address && user.address.zipcode ? user.address.zipcode: 'no zipcode' }</li>
                <li><strong>Phone - </strong>{user.phone ? user.phone: 'no user phone'}</li>
                <li><strong>Website- </strong>{user.website ? user.website: 'no user website'}</li>   
            </ul>        
    );
}

export default User;