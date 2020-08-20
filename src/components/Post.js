import React, { Component } from 'react';
import axios from 'axios';


class Post extends Component {
    constructor() {
        super();

        this.state = {
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
            .catch( err => console.log( "Error getting Post: ", err )
            )
    }

    render() {

        return(
            <div className="Post">
                <main className="post-main-container">
                    <div className="post-top-container">
                        <h1 className="post-text">{this.state.title}</h1>
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
                </main>
            </div>
        );
    }

}


export default Post;