import React from 'react';
import "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import "./Footer.css";

const Footer = () => {
    return (
        <>
            <div className="main_footer">
                <div className="socialmedia_logos">
                    <span className="span_logo" ><FacebookIcon htmlColor="grey" style={{ fontSize: 30 }} /></span>
                    <span className="span_logo" ><InstagramIcon htmlColor="grey" style={{ fontSize: 30 }} /></span>
                    <span className="span_logo" ><TwitterIcon htmlColor="grey" style={{ fontSize: 30 }} /></span>
                    <span className="span_logo" ><YouTubeIcon htmlColor="grey" style={{ fontSize: 30 }} /></span>
                </div>
                <div className="footer_rows">
                    <p>Audio and Subtitles</p>
                    <p>Audio Discription</p>
                    <p>Help Center</p>
                    <p>Gift Cards</p>
                    <p>Media Center</p>
                    <p>Investers Relations</p>
                    <p>Jobs</p>
                    <p>Terms of Use</p>
                    <p>Privacy</p>
                    <p>Legal Notices</p>
                    <p>Corporate Information</p>
                    <p>Contact Us</p>
                </div>
                <div className="endline">
                    <p> © 1997-2021 Netflix, Inc.</p>
                </div>
            </div>
        </>
    )
}

export default Footer;
