import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/session";

import "./LoginSignup.css";

export default function LoginSignup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const sessionUser = useSelector((state) => state.session.user);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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
                    <img style={{ cursor: "pointer" }} src="/assets/logo.png" alt="logo" onClick={() => navigate('/')} />
                </div>
                <div className="hero-image">
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
                                <input style={{ width: "95%" }} type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                    }
                </div>
            </section>
        </main>
    );
}