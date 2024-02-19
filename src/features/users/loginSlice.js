import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    email: '' , 
    password: '',
    fullName: '',
    loggedIn: false,
    isRegistering: false,
    userName: ''
}

export const loginSlice = createSlice ({
    name: 'login',
    initialState,
    reducers: {
        setEmail:(state,action) => {
            state.email = action.payload
        },
        setPassword: (state , action) => {
            state.password = action.payload
        },
        setFullName:(state ,action) => {
            state.fullName = action.payload
        },
        setLoggedIn:(state , action) => {
            state.loggedIn = action.payload
        },
        setRegistering:(state , action) => {
            state.isRegistering = action.payload
        },
        setUsername: (state , action) => {
            state.userName = action.payload
        },
        loginUserSuccess:(state , action) => {
            state.loggedIn = true;
            state.userName = action.payload.fullName
        },
        registerUserSuccess: (state, action) => {
            state.loggedIn = true;
            state.userName = action.payload.fullName;
        },
        logoutUserSuccess: (state) => {
            state.loggedIn = false;
            state.email = '';
            state.password = '';
            state.fullName = '';
            state.userName = '';
        }
    }
})

export const { setEmail, setPassword, setFullName, setLoggedIn, setIsRegistering, setUserName, loginUserSuccess, registerUserSuccess, logoutUserSuccess } = loginSlice.actions;

//Action Creators

export const loginUser = ({email , password}) => async dispatch => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(user => user.email === email)
    if(user) {
        const decodedPassword = atob(user.password)
        if (decodedPassword === password) {
            dispatch(loginUserSuccess(user));
            localStorage.setItem('loggedIn' , 'true')
            const randomId = Math.random().toString(36).substr(2,9);
            const userDetails = {
                id:randomId,
                name:user.fullName,
                email:user.email
            }
            const encodedUserDetails = btoa(JSON.stringify(userDetails));
            document.cookie = `userData=${JSON.stringify(encodedUserDetails)}; expires=Thu, 01 Jan 2026 00:00:00 UTC; path=/`;
            return;
        }
    }
    alert('Invalid email or password')
};

export const registerUser = ({email , password , fullName}) => async dispatch => {
    const users = JSON.parse(localStorage.getItem("users") || '[]')
    const existingUser = users.find(user => user.email === email)
    if(existingUser) {
        alert("Email already Exists")
        return;
    }
    const encryptedPassword = btoa(password);
    users.push({email , password:encryptedPassword, fullName});
    localStorage.setItem('users',JSON.stringify(users))
    localStorage.setItem('loggedIn' , 'true');
    alert("User Account Created Successfully")
    dispatch(registerUserSuccess({email,fullName}))
}

export const logoutUser = () => async dispatch => {
    localStorage.removeItem('loggedIn')
    dispatch(logoutUserSuccess());
}

export default loginSlice.reducer;