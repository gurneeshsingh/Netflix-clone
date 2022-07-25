import React from 'react';
import Navbar from "./Navbar";
import PlansScreen from "./PlansScreen";
import { useSelector } from 'react-redux';
import { selectUser } from "../features/userSlice";
import "./ProfileScreen.css";
import { auth } from '../firebase';

const ProfileScreen = () => {

    // useSelector hook to get the value of user stored inthe redux store 
    const user = useSelector(selectUser);
    
    return (

        <div className="profileScreen">

            {/* render navbar component here so that it shows on profilescreen also  */}
            <Navbar />

            <div className="profileScreen_body">
                <h1>Edit Profile</h1>
                <div className="profileScreen_info">
                    <img className="profileScreen_avatar" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="avatar" />
                </div>
                <div className="profileScreen_details">
                    {/* logged in user email id , will take value from the userSlise */}
                    <h2> {user.email}</h2>
                    <div className="profileScreen_plans">
                        <h3>Plans</h3>
                        {/* Render the plans seperatly in a different component  */}
                        <PlansScreen />
                        {/* when clicked , user gets logged out , will use auth.logout  */}
                        <button onClick={() => auth.signOut()} className="signout_btn">Sign Out</button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ProfileScreen;
