import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const RegisterPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <div className="register-page">
                <div className="register-card">
                    <h2>Register With Us</h2>
                    <p className="register-subtitle">Fill up the form to become a service partner</p>
                    <form className="register-form" onSubmit={(e) => { e.preventDefault(); alert("Form submitted (demo)"); }}>
                        <fieldset>
                            <legend>Personal Info</legend>
                            <input type="text" placeholder="First Name" required />
                            <input type="text" placeholder="Last Name" required />
                            <input type="email" placeholder="Email (e.g., a@email.com)" required />
                            <input type="tel" placeholder="Mobile Number" required />
                        </fieldset>

                        <fieldset>
                            <legend>Business Info</legend>
                            <input type="text" placeholder="Business Name" />
                            <input type="text" placeholder="Office Number" />
                            <input type="text" placeholder="Tax Number" />
                        </fieldset>

                        <fieldset>
                            <legend>Address</legend>
                            <input className="full-width" type="text" placeholder="Address" />
                            <input type="text" placeholder="City" />
                            <input type="text" placeholder="State / Region" />
                            <input type="text" placeholder="Pincode" />
                        </fieldset>
                        <div className="submit-btn-container">
                            <button className="submit-btn" type="submit">SUBMIT REGISTRATION</button>
                        </div>
                        <div style={{ marginTop: 16, textAlign: 'center' }}>
                            <Link to="/" className="back-link">← Back to Home</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;