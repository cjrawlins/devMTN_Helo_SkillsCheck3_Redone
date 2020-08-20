import React, { Component } from 'react';
import store from '../redux/store';
import { connect } from 'react-redux';
import axios from 'axios';


class Form extends Component {
    constructor() {
        super();

        const reduxState = store.getState();

        this.state = {
            title: '',
            img: '',
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
                    <img className="form-image" src={this.state.img} alt="#"/>
                    <input onChange={ e => this.handleInput(e)} className="form-input" type="text" name="img" placeholder="Enter Post Image URL" />
                    <input onChange={ e => this.handleInput(e)} className="form-input" type="text" name="content" placeholder="Enter Post Content" />
                    <button onClick={this.handleSubmit} className="form-post-button">Post</button>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Form);