import axios from 'axios';

const initialState = {
    user: {
        id: 0,
        username: 'user',
        profilePic: "http://baypoint.academy/wp-content/uploads/2017/01/dummy-profile-pic-300x300.jpg",
        loggedIn: false
    }
}

// Action Names
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const GET_USER = 'GET_USER';

// Redux Actions
export function loginUser(user) {
    return {
        type: LOGIN_USER,
        payload: user
    }
}

export function logoutUser() {
    console.log("Reducer Logout");
    return {
        type: LOGOUT_USER,
        payload: initialState
    }
}

export function getUser() {
    const user = axios.get('/api/auth/getuser')
    return {
        type: GET_USER,
        payload: user
    }
}


// Reducer Function
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN_USER: 
            return { ...state, user: action.payload}
        case LOGOUT_USER: 
            return { ...state, ...action.payload }
        case GET_USER + "_PENDING":
            return state
        case GET_USER + "_FULFILLED":
                return { ...state, user: action.payload.data,}
        case GET_USER + "_REJECTED":
            return initialState
        default: 
            return initialState
    }
} 