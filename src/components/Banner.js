
import React, { useState, useEffect } from 'react';
import ReactStars from "react-rating-stars-component";
import axios from "../axios";
import requests from "../requests";
import "./Banner.css";



const Banner = () => {

    // state for the movies to be stored from api requests 
    
    const [movies, setMovies] = useState([]);
    // number of star ratings
    
    const stars = {
        size: 25,
        value: Math.floor((Math.random()*10)/2) + 1,
        edit: false
    };

    // useeffect hooks to show data when page loads , use async function inside with axios
    useEffect(() => {
       
        async function fetchData() {
            try {
                const response = await axios.get(requests.fetchMostPopular);
                const randomMovie = response.data.results[Math.floor(Math.random() * response.data.results.length )];
                setMovies(randomMovie);
                return response;

            } catch (err) {
                console.log(err);
            }
        };
    
        fetchData();
    }, []);


    // create a truncate function that takes 2 args (string, number) which will handle the movie discription if its too long or beyond the number specified
    function truncate(string, number) {
        return (
            (string?.length > number) ? string.substr(0, number - 1) + ' ...' : string
        );
    }
    
    return (
        <>
            <header className="banner" style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies?.backdrop_path}")`,
                backgroundSize: "cover",
                backgroundPosition: "center center"
            }}> 
                <div className="banner_contents">
                    <h1 className="banner_title">
                        {movies?.name || movies?.title || movies?.original_name} <span className="release_year">{`(${movies?.release_date?.slice(0,4)})` }</span>
                    </h1>
                  
                    <div className="banner_ratings">
                        <ReactStars {...stars}/>
                    </div>
                    <h1 className="banner_discription">
                        {truncate(movies?.overview, 140)}
                    </h1>
                </div>

                {/* to make the bottom fade  */}
                <div className="banner--fadeBottom" />
            </header>
        </>
    )
}

export default Banner;
