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
            posts: reduxState.posts,
            postFilteredByUser: false,
            searchInput: ''
        }
    }

    componentDidMount = () => {
        this.getAllPosts();
      }

    getAllPosts = () => {
        if ( this.state.user.id > 0 ) {
            axios
            .get("/api/posts")
            .then( res => {
                this.setState( { posts: res.data, postFilteredByUser: false } );
                this.props.getAllPosts(res.data);
            } )
            .catch( err => console.log( "Error: ", err )
            )
        }
      }

    filterPostByUser = () => {
          if (!this.state.postFilteredByUser) {
            const filteredPosts = this.state.posts.filter( e => {
                return e.author_id === this.state.user.id;
            } )
            this.setState( { posts: filteredPosts, postFilteredByUser: true } );
          } else {
            this.getAllPosts();
          }
      }

      handleInput(e) {
        this.setState({ [e.target.name]: e.target.value })
      }

      searchTitle = () => {
        console.log("Search Title Called: ");
        axios
            .get(`/api/search/?title=${this.state.searchInput}`)
            .then( res => {
                this.setState( { posts: res.data, } );
            } )
            .catch( err => console.log( "Error: ", err )
            )
      }


    render() {
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
                        <input className="dash-search-input" placeholder="Search by Title"
                            name="searchInput" onChange={ e => this.handleInput(e)}
                        />
                        <img className="dash-search-button" src="./media/search_logo.png" alt="#"
                            onClick={this.searchTitle}
                        />
                        <button className="dash-reset-button" onClick={this.getAllPosts} >Reset</button>
                    </div>
                    <div className="dash-checkbox-container" onChange={this.filterPostByUser} >
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