import config from "../config";
import fetch from 'isomorphic-fetch';
const apiUrl = config.apiUrl;



const parseResponse = data => data.json();

const fetchAPI = (url, method, body) =>
    fetch(
        apiUrl + url,
        {
            method,
            body,
            headers: { 'Content-Type': 'application/json' }
        }
    )
        .then(parseResponse)
        .catch(err => {});

export const getMovies = () => {
    return fetchAPI('movies', 'GET');
};

export const postMovie = (title) => {

    const body = {
        title: title
    };

    return fetchAPI('movies', 'POST', JSON.stringify(body));
};

export const getComments = (movieId) => {
    const url = movieId ? 'comments/' + movieId : 'comments';
    return fetchAPI(url, 'GET');
};

export const postComment = (movieId, text) => {
    const body = {
        movieId: movieId,
        body: text
    };

    return fetchAPI('comments', 'POST', JSON.stringify(body));
};
