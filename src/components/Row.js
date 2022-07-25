import React, { useState, useEffect } from 'react';
import axios from '../axios';
import "./Row.css";
import movieTrailer from 'movie-trailer';
import ReactPlayer from 'react-player/youtube';




const Row = ({ title, fetchUrl, isLargeRow = true }) => {

    const base_url = "https://image.tmdb.org/t/p/original/";

    // state to store movies
    const [movie, setmovie] = useState([]);

    // state for youtube trailers of movies 
    const [trailer, setTrailer] = useState('');

    async function fetchTrailer(id) {
        try {
            const video = await movieTrailer(id, { tmdbId: id })
            if (video !== null) {
                setTrailer(video);
                return video;

            }
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(fetchUrl);
                setmovie(response.data.results);
                return response;

            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, [fetchUrl])


    return (
        <>

            <div className="row">
                <h2 >{title}</h2>
                <div className="all_posters">
                    {movie.map((item) => {
                        if ((isLargeRow && item.poster_path) || (!isLargeRow && item.backdrop_path)) {
                            return (
                                <img
                                    onClick={() => fetchTrailer(item.id)}
                                    key={item.id}
                                    className={`${isLargeRow} ? row_posterLarge : row_poster`}
                                    src={`${base_url}${isLargeRow ? item.poster_path : item.backdrop_path}`}
                                    alt="title" />
                            )
                        } else {
                            return ""
                        }
                    })}

                </div>

            </div>

            {trailer !== "" ? <div className="trailerWindow"><ReactPlayer
                controls
                playing={true}
                width='100%'
                url={trailer} />
                <button onClick={() => setTrailer('')} className="btn_close_video">Close Video</button>
            </div>
                : ""}

        </>

    )
}

export default Row;
