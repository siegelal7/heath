import {createContext} from 'react';

const UserContext = createContext({token: '', user: {id:'', name: '',userName: '', email: ''}});

export default UserContext;