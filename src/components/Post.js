import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import store from '../redux/store';
//import { connect } from 'react-redux';



class Post extends Component {
    constructor() {
        super();

        const reduxState = store.getState();

        this.state = {
            userId: reduxState.user.id,
            postId: 0,
            title: "",
            img: "",
            content: "",
            author: "",
            authorPicture: ""
        }
    }

    componentDidMount = () => {
        let postId = +this.props.location.pathname.slice(6);
        console.log("CompDidMount PostId: ", postId);
        axios
            .get(`/api/post/${postId}`, {
                params: {
                    id: postId
                }
            })
            .then( res => {
                console.log(res.data[0])
                this.setState( {
                    postId: res.data[0].id,
                    title: res.data[0].title,
                    img: res.data[0].img,
                    content: res.data[0].content,
                    authorId: res.data[0].author_id,
                    author: res.data[0].username,
                    authorPicture: res.data[0].profile_pic
                } )
            } )
            .catch( err => console.log( "Error getting Post: ", err ))
    }

    deletePost = () => {
        let postId =  this.state.postId;
        console.log("Deleting Post: ", postId);
        axios.delete(`/api/post/${postId}`, {
            params: {
                id: postId
            }
        })
        .catch( err => console.log( "Error deleting Post: ", err ))
    }

    render() {

        return(
            <div className="Post">
                <main className="post-main-container">
                    <div className="post-top-container">
                        <h1 className="post-title">{this.state.title}</h1>
                        <div className="post-profile-container">
                            <h3>{this.state.author}</h3>
                            <img className="post-profile-image" src={this.state.authorPicture} alt="#"/>
                        </div>
                    </div>
                    <div className="post-bottom-container">
                        <div className="post-bottom-image-container">
                            <img className="post-image" src={this.state.img} alt="#"/>
                        </div>
                        <div className="post-bottom-text-container">
                            <p className="post-text">{this.state.content}</p>
                        </div>
                    </div>
                    {this.state.userId === this.state.authorId ?
                    <Link to="/dashboard">
                        <button className="post-delete-button" onClick={this.deletePost}>Delete Post</button> 
                    </Link>
                    : null
                    }
                </main>
            </div>
        );
    }

}


export default (Post);