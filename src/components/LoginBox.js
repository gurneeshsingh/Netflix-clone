import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react'
import { auth } from "../firebase";
import "./LoginBox.css";

const LoginBox = () => {

    // state to toggle signin ,signup box 
    const [toggle, setToggle] = useState(true);

    // function to toggle box 
    const toggleBtn = () => {
        setToggle(!toggle);
    }

    //useRef to get the values of input feild of email and password 
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    // signIn function
    const signIn = (e) => {
        e.preventDefault();

        // below method returns a promise 
        signInWithEmailAndPassword(auth,
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {

        }).catch((err) => {
            alert(err.message)
        })
    };

    // signUp function
    const signUp = (e) => {
        e.preventDefault();

        // below method returns a promise 
        createUserWithEmailAndPassword(auth,
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
    
        }).catch((err) => {
            alert(err.message)
        })
    };

    return (
        <>
            <div className="loginBox">
                <form >
                    {toggle ?
                        <>
                            <h1>Sign In</h1>
                            <input ref={emailRef} type="email" placeholder="Email" autoComplete="off" />
                            <input ref={passwordRef} type="password" placeholder="Password" autoComplete="off" />
                            <button onClick={signIn} type="submit">Sign In</button>
                            <h4><span className="grey">New to Netflix? </span> <span onClick={toggleBtn} className="link">Sign Up now.</span> </h4>
                        </> :
                        <>
                            <h1>Sign Up</h1>
                            <input ref={emailRef} type="email" placeholder="Email" autoComplete="off" />
                            <input ref={passwordRef} type="password" placeholder="Password" autoComplete="off" />
                            <button onClick={signUp} type="submit">Sign Up</button>
                            <h4><span className="grey">Already have an Account? </span> <span onClick={toggleBtn} className="link">Sign In </span> </h4>
                        </>
                    }
                </form>
            </div>

        </>
    )
}

export default LoginBox;
