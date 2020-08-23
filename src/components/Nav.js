import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import store from '../redux/store';
import {logoutUser} from '../redux/userReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; 




class Nav extends Component {

    constructor() {
        super();

        const reduxState = store.getState();

        this.state = {
            user: reduxState.user
        }
    }



    logout = () => {
        console.log("Logout Called in Nav")
        axios.delete('/api/auth/logout').then( res => {
            logoutUser();
        } ).catch( err => {
            console.log(err)
        })
    }

    render() {

        const { username, profilePic } = this.state.user;

        return(
            <div className="Nav">
                <div className="nav-top-container">
                    <div className="nav-profile-container">
                        <img className="nav-profile-image" alt="profile" src={profilePic}/>
                        <p className="nav-profile-name">{username}</p>
                    </div>
                    <Link to="/dashboard">
                    <img className="nav-link-images" src="./media/home_logo.png" alt="./media/no_image.png" />
                    </Link>
                    <Link to="/new">
                    <img className="nav-link-images" src="./media/new_logo.png" alt="./media/no_image.png" />
                    </Link>
                </div>
                <div className="nav-bottom-container">
                    <Link to="/">
                    <img className="nav-link-images" onClick={ () => this.logout()} src="./media/shut_down.png" alt="./media/no_image.png" />
                    </Link>
                </div>
            </div>
        )
    }


}
const mapStateToProps = state => state;

export default withRouter(Nav); connect(mapStateToProps, {logoutUser});