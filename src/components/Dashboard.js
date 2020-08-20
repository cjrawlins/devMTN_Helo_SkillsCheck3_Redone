import React, { Component } from 'react';
import {getUser} from '../redux/userReducer';
import {getAllPosts} from '../redux/userReducer';
import store from '../redux/store';
import { connect } from 'react-redux';
import axios from 'axios';


import { Link } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        const reduxState = store.getState();

        this.state = {
            user: {
                id: reduxState.user.id,
                username: reduxState.user.username,
                profilePic: reduxState.user.profilePic
            },
            posts: reduxState.posts

        }
        this.getPostsToRender();
    }

    componentDidMount = () => {
        this.props.getUser();
        //console.log("Dash CompDidMnt Post State: ", this.state.posts);
      }

    getPostsToRender = () => {
        //console.log("Get All Posts Called in Dash", this.props);
        axios
            .get("/api/posts")
            .then( res => {
                this.setState( { posts: res.data } );
                //console.log("Get Posts", res.data);
                this.props.getAllPosts(res.data);
            } )
            .catch( err => console.log( "Error: ", err )
            )
    }


    render() {
        // let postMap =
        //console.log("Dash Render Post State: ", this.state.posts);
        const mapPosts = this.state.posts.map( function(curr, index) {
            return( 
                    <Link key={index} to={`/post/${curr.id}`} >
                       <div className="dash-post-list">
                             <h1 className="post-title">{curr.title}</h1>
                             <div className="post-profile-container">
                                <h3>{curr.username}</h3>
                                <img className="post-profile-image" src={curr.profile_pic} alt="#"/>
                             </div>
                        </div>
                    </Link>
            )
        } )
        
        return(
            <div className="Dashboard">
                <div className="dash dash-search-container">
                    <div className="dash-search-input-container">
                        <input className="dash-search-input" 
                            placeholder="Search by Title" 
                            ></input>
                        <img className="dash-search-button" src="./media/search_logo.png" alt="#" ></img>
                        <button className="dash-reset-button">Reset</button>
                    </div>
                    <div className="dash-checkbox-container">
                        <p>My Posts</p>
                        <input type="checkbox" id="checkbox-my-posts"/>
                    </div>
                </div>
                <div className="dash dash-posts-container">
                    {mapPosts}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, {getUser, getAllPosts} )(Dashboard);