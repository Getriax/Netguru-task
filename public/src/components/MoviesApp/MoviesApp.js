import React, { Component } from 'react';
import logo from '../../logo.svg';
import './MoviesApp.css';
import { getMovies, postMovie } from "../../services/api";
import Comment from '../Comment/Comment';

class MoviesApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            movies: [],
            isAdding: false,
            clickToClose: false,
            postInput: '',
            postingMovie: false,
            addButtonText: 'Add a movie!',
            inputTitle: '',
            canShowMovieDetails: true,
            showComments: false,
        }

    }


    componentDidMount() {
        getMovies()
            .then(moviesData => {
                this.setState({
                    movies: moviesData,
                    loading: false
                });
                if(moviesData instanceof Array)
                moviesData.forEach(movie => {
                    this.state[movie._id] = false;
                });
            })
            .catch(console.error);
    }

    //Input onChange event
    handleChangeInput(evt, val) {
        this.setState({
            [val]: evt.target.value
        });
    }


    handleMoviePost(evt) {
        //If there is no title specified return
        if(this.state.postInput === '')
            return;
        evt.preventDefault();

        this.setState({
            addButtonText: 'Adding...',
            postingMovie: true
        });
        const title =  this.state.postInput;
        postMovie(title)
            .then(movieData => {
                if("Title" in movieData) {
                    this.state.movies.push(movieData);
                    this.setState({
                        addButtonText: 'Movie added',
                        postInput: ''
                    });
                } else {
                    this.setState({
                        addButtonText: 'Movie not found',
                        postInput: ''
                    });
                }

                setTimeout(() => this.setState({
                    addButtonText: 'Add a movie!',
                    postingMovie: false
                }), 1000)
            })
            .catch(console.error)
    }


    //If user clicked 'Add a movie' button it will show the input box
    addMovie() {
        if(this.state.isAdding) {
            return (
                <div className='add-form'>
                    <input className="form-control mr-sm-2 py-0" type="text" value={this.state.postInput} placeholder="Input title" onChange={(e) => this.handleChangeInput.call(this, e, 'postInput')}/>
                    <button className="btn btn-outline-success py-0 my-2 my-sm-0" disabled={this.state.postingMovie} onClick={this.handleMoviePost.bind(this)}>{this.state.addButtonText}</button>
                </div>
            );
        }
    }

    //If user clicks 'Add a movie' button the function above if value will be change
    handleAddMovieShow(e) {
        e.preventDefault();
        const show = !this.state.isAdding;
        this.setState({
            isAdding: show
        });
    }

    //Create a arrow pointing up or down
    arrowSVG(by) {
        return (
            <svg viewBox="0 0 20 20" className={this.state[by] === 1 ? "arrow arrow-down" : "arrow arrow-up"}>
                <path d="M0 0 L10 10 L0 20" fill="#F4F3E9"></path>
            </svg>
        );
    }

    //If user clicks comments or go back button
    handleShowComments() {
        const value = !this.state.showComments;
        this.setState({
            showComments: value
        })
    }

    //When user clicks on a movie show the details
    showMovieDetails(movie) {
        if(this.state[movie._id]) {
            if(!this.state.showComments)
            return (
                <div className="movie-spec background-cover" style={{backgroundImage: 'url(' + movie.Poster + ')'}}>
                    <div className="dark">
                        <div className="col-12 text-right pr-2">
                            <button className="cancel-button big-x" onClick={this.toggleShowMovieDetails.bind(this, movie)} >X</button>
                        </div>
                        <div className="row no-gutters align-items-end movie-details">
                            <div className="col-12 text-center">
                                <p>Title: {movie.Title}</p>
                                <p>Genre: {movie.Genre}</p>
                                <p>Year: {movie.Year}</p>
                                <p>Rating: {movie.imdbRating}/10</p>
                                <p>Director: {movie.Director}</p>
                                <hr/>
                                <p>{movie.Plot}</p>
                                <hr/>
                                <p className="p-comments" onClick={this.handleShowComments.bind(this)}>
                                    Comments
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );

            return (
                <div className="movie-spec background-cover" style={{backgroundImage: 'url(' + movie.Poster + ')'}}>
                    <div className="dark">
                        <div className="col-12 text-right pr-2">
                            <button className="cancel-button big-x" onClick={this.toggleShowMovieDetails.bind(this, movie)}>X</button>
                        </div>
                        <div className="row no-gutters justify-content-center movie-details">

                            <Comment movieId={movie._id} handleShowComments={this.handleShowComments.bind(this)}/>

                        </div>
                    </div>
                </div>
            );
        }


        return null;
    }

    //Manages the state of movie details
    toggleShowMovieDetails(movie) {

            //Check if there is a open movie details
            const filtered = this.state.movies.filter(mov => this.state[mov._id]);
            const show = filtered.length === 0;
            let showId;
            let mId = movie._id;

            //If there is an open one get its id
            if(!show)
                showId = filtered[0]._id;

            //Check if the clicked one isn't clicked while other one is open if so open one will be closed
            if(showId && showId !== mId) {
                mId = showId;
            }

            this.setState({
                [mId]: show,
            });

            if(show) {
                document.body.getElementsByTagName('nav')[0].style.top =  '-10vh';
            } else {
                document.body.getElementsByTagName('nav')[0].style.top =  '0';
                this.setState({
                    showComments: false
                })
            }


    }

    //Return filtered movies list
    moviesList() {
        if(this.state.movies instanceof Array)
        return this.state.movies
            .filter(movie => (movie.Title.match(`^${this.state.inputTitle}`) || !this.state.inputTitle))
            .map(movie => {
                return (
                    <div className="div-movie" key={movie._id}>
                    {this.showMovieDetails(movie)}
                    <div className='img-div background-cover' style={{backgroundImage: 'url(' + movie.Poster + ')'}} onClick={this.toggleShowMovieDetails.bind(this, movie)}>
                        <div className='movie-data'>
                            <p>{movie.Title} | {movie.imdbRating}/10</p>
                            <p className='movie-plot'>{movie.Plot}</p>
                        </div>
                    </div>
                </div>
                );
            });

        return null;
    }

    render() {
        //Show loading if still getting movies
        if(this.state.loading)
            return (
                <div className="container-fluid">
                    <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                        <img src={logo} className="App-logo" alt="loading"/>
                    </div>
                </div>
            );

        //Create view
        return (
            <div className='app'>
                <nav className="navbar fixed-top">
                    <span className="navbar-brand movime">
                        Movime
                    </span>
                    <div className='d-flex ml-auto add-nav'>
                        <div className="add-button" onClick={this.handleAddMovieShow.bind(this)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className='svg-add' viewBox="0 0 448 512" fill='#D0DC3F' width="100%" transform={this.state.isAdding ? 'rotate(45)' : 'rotate(0)'}>
                                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                            </svg>
                        </div>
                        {this.addMovie()}
                    </div>

                </nav>
                <div className="container-fluid" onClick={(e) => {
                    if(this.state.isAdding && this.state.clickToClose)
                        this.handleAddMovieShow.call(this, e);
                }}>

                    <div className="row no-gutters content">
                        <div className="col-12 text-center">
                            <input type="text" className="search" placeholder='Search by title' onChange={(e) => this.handleChangeInput.call(this, e, 'inputTitle')}/>
                        </div>
                        <div className="col-12 movies-col mt-5">

                            <div className="grid-movies">
                                {this.moviesList()}
                            </div>
                        </div>
                    </div>

                    <footer>
                        Recruitment task for Netguru &copy; Nikodem Strawa
                    </footer>
                </div>
            </div>
        );
    }

}

export default MoviesApp;
