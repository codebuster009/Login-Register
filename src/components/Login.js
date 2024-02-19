import React, {useEffect } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { setEmail, setPassword, setFullName, loginUser, registerUser, logoutUser, setIsRegistering } from './loginSlice';
import "./Login.css"

const Login = () => {
    const dispatch = useDispatch();
    const { email, password, fullName, loggedIn, isRegistering, userName } = useSelector(state => state.login);
    useEffect(() => {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
        if (isLoggedIn) {
            const userDetails = JSON.parse(atob(document.cookie.split('=')[1]));
            dispatch(setFullName(userDetails.name));
            dispatch(setIsRegistering(false));
        }
    }, [dispatch]);

    const handleEmailChange = (event) => {
        dispatch(setEmail(event.target.value));
    };

    const handlePasswordChange = (event) => {
        dispatch(setPassword(event.target.value));
    }; 

    const handleFullNameChange = (event) => {
        dispatch(setFullName(event.target.value));
    };

    const handleRegisterSubmit = (event) => {
        event.preventDefault()
        dispatch(registerUser({email , password , fullName}))
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = storedUsers.find(user => user.email === email);
        console.log(user , "user")
        if (user) {
            const decodedPassword = atob(user.password);
            if (decodedPassword === password) {
                // Set loggedIn state to true
                setLoggedIn(true);
                // Set loggedIn status in local storage
                localStorage.setItem('loggedIn', 'true');
                const randomId = Math.random().toString(36).substr(2, 9)
                // Save all user details as a JSON object in a cookie
                const userDetails = {
                    id: randomId,
                    name: user.fullName,
                    email: user.email
                    // Add more details as needed
                };
                const encodedUserDetails = btoa(JSON.stringify(userDetails));
                document.cookie = `userData=${JSON.stringify(encodedUserDetails)}; expires=Thu, 01 Jan 2026 00:00:00 UTC; path=/`;
                setUserName(user.fullName)
                return;
            }
        }
        alert('Invalid email or password');
    };
    


    const handleLogout = () => {
        // Clear logged in status from local storage
        localStorage.removeItem('loggedIn');
        setLoggedIn(false);
        setEmail('');
        setPassword('');
        setFullName('');
    };

    return (
        <div className="container">
            {loggedIn ? (
                <div>
                    <p>Welcome {userName}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <form className="form" onSubmit={isRegistering ? handleRegisterSubmit : handleLoginSubmit}>
                    {isRegistering && (
                        <div className="input-group">
                            <label htmlFor="fullname" className="label">Full Name</label>
                            <input type="text" name="fullname" id="fullname" className="input" value={fullName} onChange={handleFullNameChange} />
                        </div>
                    )}
                    <div className="input-group">
                        <label htmlFor="email" className="label">Email</label>
                        <input type="text" name="email" id="email" className="input" value={email} onChange={handleEmailChange} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="passw" className="label">Password</label>
                        <input type="password" name="passw" id="passw" className="input" value={password} onChange={handlePasswordChange} />
                    </div>
                    <button type="submit" className="button">{isRegistering ? 'Create Account' : 'Login'}</button>
                </form>
            )}

            {/* Display only if user is not logged in */}
            {!loggedIn && (
                <div className="button-container">
                    <button className='button' onClick={() => setIsRegistering(true)}>Register</button>
                    <button className='button' onClick={() => setIsRegistering(false)}>Login</button>
                </div>
            )}
        </div>
    );
}

export default Login;
