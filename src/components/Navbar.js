import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './Navbar.css';


const Navbar = () => {
    // use this hook to push the profile page when clicked on avatar
    const history = useHistory();

    // to hide and show the navbar on page vertial scroll, use state and event listner 
    const [show, handleShow] = useState(false);

    // function to toggle the navbar on scroll
    const transitionNavbar = () => {
        // condion if scroll is more than 100 
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    // now to trigger the scroll , add event listner and call useeffect so that when the window loads , scroll event is called 

    useEffect(() => {
        window.addEventListener('scroll', transitionNavbar);
        // cleanup function
        return () => {
            window.removeEventListener('scroll', transitionNavbar);
        }
    }, [])
    return (
        <>
            {/* we want to set the nav to black on show is true  */}
            <div className={`nav ${show ? 'nav_black' : ''}`} >
                {/* netflix logo  */}
                <img src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="logo" className="nav_logo"
                    onClick={() => history.push('/')}
                />

                {/* avatar logo  */}
                {/* when clicked , should take to the profile page , usehistory hook is used  */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="avatar" className="nav_avatar"
                    onClick={() => history.push('/profile')} />

            </div>
        </>
    )
}

export default Navbar;
