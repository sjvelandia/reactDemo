import React from 'react';

const movieListItem = (props) => (
    <div className="movie-card">
        <h3>{props.movie.title}</h3>
        <div>{props.movie.release_year}</div>
        <div className="movie-location">{props.movie.locations}</div>
    </div>
);

export default movieListItem;
