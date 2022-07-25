import React, { useState } from 'react';
import LoginBox from "../components/LoginBox";
import "./LoginScreen.css";

const LoginScreen = () => {

    // state for login
    const [login, setLogin] = useState(false);

    return (

        <div className="loginScreen">
            <div className="loginScreen_background">
                <img src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
                    className="loginScreen_logo"
                    alt="bakcground" />

                <button onClick={() => setLogin(true)} className="login_btn">Sign In</button>

                <div className="loginScreen_gradient" />
            </div>
                <div className="loginScreen_content">
                {login ? <LoginBox /> :
                    <>
                        <h1>Unlimited films, TV programmes and more.</h1>
                        <h2>Watch anywhere, Canel any time.</h2>
                        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                        <div className="loginScreen_input">
                            <form >
                                <input type="email"
                                    placeholder="Email Address"
                                    className="email_input"
                                />
                            </form>
                            <button onClick={() => setLogin(true)} className="getstarted_btn">GET STARTED</button>
                        </div>
                    </>}
                </div>
            

        </div>


    )
}

export default LoginScreen;
