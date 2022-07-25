import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import Banner from "./Banner";
import Row from "./Row";
import requests from "../requests";
import IntroLogo from "../components/IntroLogo";
import "./HomeScreen.css";
import sound from "../Netflix.mp3";




const HomeScreen = () => {

    // for intro audio
    
    const [intro, setIntro] = useState(true);
    const [audio] = useState(new Audio(sound))

    useEffect(() => {
    
        setTimeout(() => {
            setIntro(false)
        }, 5000);
    }, []);

    useEffect(() => {
        async function playSound() {
            const sound = await audio.play();
            return sound;
        };
        setTimeout(() => {
            playSound();
        }, 1000);
       
    },[audio])

    

    return (

        <div className="homescreen">
            {intro ? <IntroLogo /> :
                <>
                    <Navbar /> 
                    <Banner /> 
                    <Row
                        title='MOST POPULAR'
                        fetchUrl={requests.fetchMostPopular}
                        isLargeRow
                    />
                    <Row title='TRENDING NOW' fetchUrl={requests.fetchTrending} />
                    <Row title='TOP RATED' fetchUrl={requests.fetchTopRated} />
                    <Row title='COMEDY MOVIES' fetchUrl={requests.fetchComedyMovies} />
                    <Row title='ROMANCE MOVIES' fetchUrl={requests.fetchRomanceMovies} />
                    <Row title='HORROR MOVIES' fetchUrl={requests.fetchHorrorMovies} />
                    <Row title='DOCUMENTARIES' fetchUrl={requests.fetchDocumentaries} />
                </>
            }
        </div>
    )
}

export default HomeScreen;
