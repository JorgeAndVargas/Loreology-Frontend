import React, {useState} from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
    return (
    <div className="auth">
        <Login />
        <Register />
    </div>
    );
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [_, setCookies] = useCookies(["access_token"])

    const navigate = useNavigate()

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/login", {
                username,
                password,
            });

            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID)
            //when we login we go back to the homepage
            navigate("/")

        } catch(err) {
            console.error(err);
        }

    };


    return (
        <Form 
            username={username} 
            setUsername={setUsername} 
            password={password} 
            setPassword={setPassword}
            label="Login"
            onSubmit={onSubmit}
            buttonLabel="Login"
        />
    );    
};



const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //connecting the frontend to the backend using axios for Register
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password
            });
            alert("Registration Completed! Login now please");
        } catch (err) {
            console.error(err);

        }
    };
 

    return (
    <Form 
        username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword}
        label="Register"
        onSubmit={onSubmit}
        buttonLabel="Register"
        
    />

    ) 
};

//using props to differentiate, created a form that can be used for both registering and login
const Form = ({username, setUsername, password, setPassword, label, onSubmit, buttonLabel}) => {
    return (
        <div className="auth-container">
        <form onSubmit={onSubmit}>
            <h2> {label} </h2>
            <div className="form-group">
                <label htmlFor="username"> Username: </label>
                <input 
                    type="text" 
                    id="username" 
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password"> Password: </label>
                <input 
                    type="password" 
                    id="password" 
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>

            <button type="submit">{buttonLabel}</button>
        </form>
    </div>
    ) 

}