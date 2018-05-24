import React from 'react';

const movieListItem = (props) => (
    <div className="movie-card">
        <ul>
            <li><h4 className="movie-title">{props.movie.title}</h4></li>
            <li><div className="movie-year">{props.movie.release_year}</div></li>
        </ul>
        
        
        <div className="movie-location">{props.movie.locations}</div>
    </div>
);

export default movieListItem;
