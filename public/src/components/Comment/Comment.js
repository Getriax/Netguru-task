import React, { Component } from 'react';
import logo from '../../logo.svg';
import {postComment, getComments} from '../../services/api';
import './Comment.css';

class Comment extends  Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            comments: [],
            placeCommentButton: 'Submit',
            commentInputValue: '',
            postingComment: false
        }
    }

    componentDidMount() {
        getComments(this.props.movieId)
            .then(comments => this.setState({
                comments: comments,
                loading: false
            }));
    }

    handleChangeInput(evt, val) {
        this.setState({
            [val]: evt.target.value
        });
    }

    //if there are comments in the render them else show information text
    renderComments() {
        if(this.state.comments instanceof Array && this.state.comments.length !== 0)
            return this.state.comments.map(com =>
                <p className='comment' key={com._id}>{com.body}</p>
            );

        return <p className='no-comment'>No comments yet</p>
    }

    handleCommentPost() {
        //If there is no body specified return
        if(this.state.commentInputValue === '')
            return;

        this.setState({
            postingComment: true,
            placeCommentButton: 'Adding...'

        });

        postComment(this.props.movieId, this.state.commentInputValue)
            .then(com => {
                this.state.comments.push(com);
                this.setState({
                    placeCommentButton: 'Submit',
                    commentInputValue: '',
                    postingComment: false
                })
            })
            .catch(console.error)
    }


    render() {
        if(this.state.loading)
            return (
                <div className="comments text-center justify-content-center align-items-center">
                    <img src={logo} className="App-logo" alt="loading"/>
                </div>
            );

            return (
            <div className="comments text-center justify-content-end align-items-center">
                <div className="text-center w-75 overflow-comment">
                    {this.renderComments.call(this)}
                </div>
                <div className='mb-2 place-comment'>
                    <input className="input-comment" type="text" value={this.state.commentInputValue} placeholder="Place comment" onChange={(e) => this.handleChangeInput.call(this, e, 'commentInputValue')}/>
                    <button className="comment-button" disabled={this.state.postingComment} onClick={this.handleCommentPost.bind(this)}>{this.state.placeCommentButton}</button>
                </div>
                <p className="p-comments mt-2" onClick={this.props.handleShowComments}>
                    Go back
                </p>
            </div>
            );
    }
}

export default Comment;