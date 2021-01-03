import React, {useState, useEffect} from 'react';
import axios from 'axios';
// Import Components
import UserList from './UserList';
import User from './User';
import UserSummary from './UserSummary';
import Collapsible from './Collapsible';
// Import Styles
import '../Styles/Parent.css';

const Parent = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [id, setId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    // for add user form
    const [formData, setFormData] = useState({});

    useEffect(() => {   document.title = "Hatchways App"    }, [])

    const getUsers = () => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(response => { setUsers(response.data)})
            .catch(err => console.log(`Error: ${err.message}`) )
    }

    // Hook for ALL users endpoint
    useEffect(() => {
        getUsers()
        console.log('App started.....')
    },[])

    // Create Ref for input fields
    let textInput = React.createRef();
    let idInput = React.createRef();

    const searchByUsername = (e) => {
        setUser({})
        // Submit the input text {username} on key press ENTER
        if(e.keyCode === 13 && e.shiftKey === false){
            console.log('searching username')
            let term = textInput.current.value

            if(term !== ''){
                console.log(term)
                let [filteredUser] = users.filter(user => user.username.toLowerCase() === term.toLowerCase())
                if(filteredUser){
                    setUser(filteredUser)
                    setSearchTerm(term)
                }  
            } else {alert('Enter a search term')}
        }
    }

    const searchById = () => {
        let search = parseInt(idInput.current.value)
        // check if user has changed the value and set the id to current value
        if(! isNaN(search)){
            let [filteredUser] = users.filter(user => user.id === search)
        
            if(id !== search && filteredUser){
                console.log(`User found with id ${filteredUser.id}`) 
                setId(search)
                setUser(filteredUser)
            }  else {
                console.log('no user found with id', search)
                console.log(Number.isNaN(search))
            }
        }
    }
    
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value.trim(),
        });
      }; 

    // Add user
    const addUser = async (event) => {
        event.preventDefault();
        console.log(formData);
        const response = await axios.post("https://jsonplaceholder.typicode.com/users", formData).catch((err) => {
          console.log("Error: ", err);
        });

        const newUser = response.data
        console.log('post response.data >>', newUser)
        
        if (response) await setUsers([...users, newUser]);
        setFormData({});
        resetForm();
      };

    const resetForm = () => {
        Array.from(document.getElementsByClassName("form-input")).map(
            input => (input.value = "")
        );
    }   

    return (
            <div className='container' >
                <div className='top'>
                    <input type='hidden' value='something'/>
                    <form onSubmit={addUser}>
                        <input type='hidden' value='prayer' />
                        <div className="form-inputs">
                            <h3>Add User</h3>
                            <input className='form-input input' name="name" placeholder="Name" onChange={handleChange} autoComplete='false'/>
                            <input className='form-input input' name="email" placeholder="Email" onChange={handleChange} autoComplete='false'/>
                            <input className='form-input input' name="username" placeholder="Username" onChange={handleChange} autoComplete='false'/>
                            {/* Contact Details */}
                            <input className='form-input input' name="phone" placeholder="Phone" onChange={handleChange} autoComplete='false'/>
                            <input className='form-input input' name="website" placeholder="Website" onChange={handleChange} autoComplete='false'/>
                        </div>
                        
                        <div className="row">
                            <button  type="submit">Add</button>
                            <button  type="reset">Clear</button>
                        </div>
                    </form>
                    
                    {id ? <UserSummary user={user}/>
                        : 
                    // Display the filtered user list if username matches search key
                    searchTerm === user.username  ? 
                        users.filter(user => user.username === searchTerm)
                            .map(user => {
                                return <UserSummary user={user} key={user.id} /> 
                            })
                            : null
                    }  

                    <p style={{textAlign:'center'}}>
                        Type in search text and press <strong>ENTER</strong> to search by username 
                        <br/>
                        or enter ID to search by ID
                    </p>
                    <hr/>

                    <div className='search-inputs'>
                        <input type='text' ref={textInput} className='input' onKeyDown={searchByUsername} placeholder='Search by Username'></input>
                        <input type='text' ref ={idInput} className='input' onChange={searchById} placeholder='by ID'></input>
                    </div>
                </div>

                <div className='center'>
                    <Collapsible title='More'>
                        {/* Shows full user details, for single user endpoint */}
                        {/* Check if there's a valid user, then pass user as props */}
                        {user.id ? <User user={user}/> : <p>Enter search criteria to view user</p>}
                    </Collapsible>            
                
                    <Collapsible title='All Users'>
                    {/* Shows users from all users' endpoint */}
                    {/* Add check to show nothing if users array is empty */}
                    {users.length > 0 ? <UserList users ={users}/> : <p>No users to view</p>}
                    </Collapsible>
                </div>
            </div>
    );
}

export default Parent;