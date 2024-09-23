import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/session";

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
    }, []);

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

    return (
        <main className='login-main'>
            <section className='left-section'>
                <div className="logo">
                    <img src="../../../dist/assets/logo.png" alt="logo" />
                </div>
                <aside className="left-text">
                    <p className='left-text-description'>
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
                                    <input type="text" name="credential" value={credential} onChange={(e) => setCredential(e.target.value)} />
                                </label>
                                {
                                    errors.credential && (
                                        <p className='error-message'>{errors.credential}</p>
                                    )
                                }
                                <label>
                                    Password
                                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                                <div className="name-container">
                                    <label>
                                        First Name
                                        <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </label>
                                    <label>
                                        Last Name
                                        <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </label>
                                </div>
                                <label>
                                    Create Password
                                    <input type="password" name="createPassword" value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} />
                                </label>
                                <label>
                                    Confirm Password
                                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </label>
                                <button type="submit" disabled={isButtonDisabled} onClick={(e) => handleSubmit(e)}>Signup</button>
                                {
                                    errors.message && (
                                        <p className='error-message'>{errors.message}</p>
                                    )
                                }
                            </form>
                        )
                    }
                </div>
                <div className='login-signup-toggle'>
                    <button onClick={() => setIsLoginSelected(true)}><FaArrowRightToBracket /></button>
                    <button onClick={() => setIsLoginSelected(false)}><FaUserPlus /></button>
                </div>
            </section>
        </main>
    );
}