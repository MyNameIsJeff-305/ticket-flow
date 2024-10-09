import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../../store/session";

import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";

import "./LoginSignup.css";

export default function LoginSignup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const [createPassword, setCreatePassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoginSelected, setIsLoginSelected] = useState(true);

    const sessionUser = useSelector((state) => state.session.user);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    //Reset the state when the component is rendered
    useEffect(() => {
        sessionUser && navigate("/dashboard");
        setCredential("");
        setPassword("");
        setErrors({});
    }, [navigate, sessionUser]);

    useEffect(() => {
        const newErrors = {};
        if (credential.length > 0 && credential.length < 4) {
            newErrors.credential = 'Username or Email must be 4 characters or longer';
        }
        if (password.length > 0 && password.length < 6) {
            newErrors.password = 'Password must be 6 characters or longer';
        }
        setErrors(newErrors);
        setIsButtonDisabled(credential.length < 4 || password.length < 6);
    }, [credential, password]);

    useEffect(() => {
        const newErrors = {};
        if (firstName.length > 0 && firstName.length < 2) {
            newErrors.firstName = 'First Name must be 2 characters or longer';
        }
        if (lastName.length > 0 && lastName.length < 2) {
            newErrors.lastName = 'Last Name must be 2 characters or longer';
        }
        if (username.length > 0 && username.length < 4) {
            newErrors.username = 'Username must be 4 characters or longer';
        }
        if (email.length > 0 && email.length < 4) {
            newErrors.email = 'Email must be 4 characters or longer';
        }
        if (createPassword.length > 0 && createPassword.length < 6) {
            newErrors.createPassword = 'Password must be 6 characters or longer';
        }
        if (confirmPassword.length > 0 && confirmPassword !== createPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        setIsButtonDisabled(firstName.length < 2 || lastName.length < 2 || email.length < 4 || createPassword.length < 6 || confirmPassword !== createPassword);
    }, [firstName, lastName, username, email, createPassword, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(login({ credential, password }))
            .then(() => navigate("/dashboard"))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.message) {
                    setIsButtonDisabled(true);
                    setErrors(data);
                }
            })
    }

    const handleDemoSubmit = async (e) => {
        e.preventDefault();

        dispatch(login({ credential: 'DemoEmp5', password: 'password' }))
            .then(() => navigate("/dashboard"))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.message) {
                    setIsButtonDisabled(true);
                    setErrors(data);
                }
            })
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        dispatch(signup({ firstName, lastName, username, email, password: confirmPassword, image }))
            .then(() => navigate("/dashboard"))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.message) {
                    setIsButtonDisabled(true);
                    setErrors(data);
                }
            })
    }

    const updateFile = e => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    return (
        <main className='login-main'>
            <section className='left-section'>
                <div className="logo">
                    <img style={{ cursor: "pointer" }} src="/assets/logo.png" alt="logo" onClick={() => navigate('/')} />
                </div>
                <div className="hero-image">
                    {/* Add a relevant image or animation here */}
                    <img src='/assets/computer.webp' alt="ticketFlow Interface" />
                </div>
                <aside className="left-text">
                    <p className='left-text-description' style={{ fontSize: "12px", textAlign: "left" }}>
                        Ticket Flow is a streamlined IT ticketing system designed to simplify support and project management. With Ticket Flow, IT teams can easily track, manage, and resolve tickets, ensuring efficient workflow, faster response times, and enhanced customer satisfaction. Perfect for IT companies looking to optimize their service management and improve operational productivity.
                    </p>
                </aside>
            </section>
            <section className='right-section'>
                <div className='form-container'>
                    {
                        isLoginSelected ? (
                            <form className="login-form">
                                <label>
                                    Username or Email
                                    <input style={{ width: "95%" }} type="text" name="credential" value={credential} onChange={(e) => setCredential(e.target.value)} />
                                </label>
                                {
                                    errors.credential && (
                                        <p className='error-message'>{errors.credential}</p>
                                    )
                                }
                                <label>
                                    Password
                                    <input style={{width:"95%"}} type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </label>
                                {
                                    errors.password && (
                                        <p className='error-message'>{errors.password}</p>
                                    )
                                }
                                <button type="submit" disabled={isButtonDisabled} onClick={(e) => handleSubmit(e)}>Log In</button>
                                {
                                    errors.message && (
                                        <p className='error-message'>{errors.message}</p>
                                    )
                                }
                            </form>
                        ) : (
                            <form className="login-form">
                                <div className="name-container" style={{gap: "30px", width: "95%"}}>
                                    <label>
                                        First Name
                                        <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                        {
                                            errors.firstName && (
                                                <p className='error-message'>{errors.firstName}</p>
                                            )
                                        }
                                    </label>
                                    <label>
                                        Last Name
                                        <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                        {
                                            errors.lastName && (
                                                <p className='error-message'>{errors.lastName}</p>
                                            )
                                        }
                                    </label>
                                </div>
                                <label>
                                    Username
                                    <input type="text" style={{ width: "95%" }} name="createPassword" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </label>
                                {
                                    errors.email && (
                                        <p className='error-message'>{errors.username}</p>
                                    )
                                }
                                <label>
                                    Email
                                    <input type="text" style={{ width: "95%" }} name="createPassword" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </label>
                                {
                                    errors.email && (
                                        <p className='error-message'>{errors.email}</p>
                                    )
                                }
                                <label htmlFor='file-upload'> Select From Computer
                                    <input
                                        type='file'
                                        id='file-upload'
                                        name="img_url"
                                        onChange={updateFile}
                                        accept='.jpg, .jpeg, .png, .gif'
                                    />
                                </label>
                                <label>
                                    Create Password
                                    <input type="password" name="createPassword" style={{width:"95%"}} value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} />
                                </label>
                                {
                                    errors.createPassword && (
                                        <p className='error-message'>{errors.createPassword}</p>
                                    )
                                }
                                <label>
                                    Confirm Password
                                    <input type="password" name="confirmPassword" style={{width:"95%"}} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </label>
                                {
                                    errors.confirmPassword && (
                                        <p className='error-message'>{errors.confirmPassword}</p>
                                    )
                                }
                                <button type="submit" disabled={isButtonDisabled} onClick={(e) => handleSignup(e)}>Signup</button>
                                {
                                    errors.message && (
                                        <p className='error-message'>{errors.message}</p>
                                    )
                                }
                            </form>
                        )
                    }
                    <button className='demo-button' onClick={(e) => handleDemoSubmit(e)}>Demo User</button>
                </div>
                <div className='login-signup-toggle'>
                    <button onClick={() => setIsLoginSelected(true)}><FaArrowRightToBracket /> Login</button>
                    <button onClick={() => setIsLoginSelected(false)}><FaUserPlus /> Signup</button>
                </div>
            </section>
        </main>
    );
}