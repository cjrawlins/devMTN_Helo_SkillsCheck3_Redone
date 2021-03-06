import React, { Component } from 'react';
import store from '../redux/store';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';


class Form extends Component {
    constructor() {
        super();

        const reduxState = store.getState();

        this.state = {
            title: '',
            img: './media/no_image.jpg',
            content: '',
            user: {
                id: reduxState.user.id
            }
        }
        
    }

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = () => {
        const newPost = this.state;
        console.log("Sending New Post: ", newPost);
        axios
            .post( '/api/post', [ newPost.title, newPost.img, newPost.content, newPost.user.id ] )
            .catch( error => console.log(error));
    }

    render() {
        return(
            <div className="Form">
                <div className="form-main-container">
                    <h1 className="form-label post-title">New Post</h1>
                    <input onChange={ e => this.handleInput(e)} className="form-input" type="text" name="title" placeholder="Enter Post Title" />
                    <img className="form-image" src={this.state.img} alt="Not Found"/>
                    <input onChange={ e => this.handleInput(e)} className="form-input" type="text" name="img" placeholder="Enter Post Image URL" />
                    <textarea onChange={ e => this.handleInput(e)} className="form-textarea" type="text" name="content" placeholder="Enter Post Content" rows="40" cols="50" />
                    <Link to="/dashboard">
                        <button onClick={this.handleSubmit} className="form-post-button">Post</button>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Form);