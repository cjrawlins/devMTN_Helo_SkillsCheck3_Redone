import React, { Component } from 'react';
import store from '../redux/store';
import { connect } from 'react-redux';


class Post extends Component {
    constructor() {
        super();

        const reduxState = store.getState();

        this.state = {
            user: {
                id: reduxState.user.id,
                username: reduxState.user.username,
                profilePic: reduxState.user.profilePic
            },
            post: 'blank'
        }
    }

    render() {
        return(
            <div className="Post">

            </div>
        );
    }

}

const mapStateToProps = state => state;


export default connect(mapStateToProps)(Post);