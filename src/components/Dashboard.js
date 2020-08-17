import React, { Component } from 'react';
import store from '../redux/store';
import {getUser} from '../redux/userReducer';
import { connect } from 'react-redux';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        const reduxState = store.getState();

        this.state = {
            user: {
                id: reduxState.user.id,
                username: reduxState.user.username,
                profilePic: reduxState.user.profilePic
            }
        }
    }

    componentDidMount() {
        this.props.getUser();
      }


    render() {
        return(
            <div className="Dashboard">
                <h1>Dashboard</h1>
                <img src={this.state.user.profilePic} alt="#"/>
            </div>
        );
    }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, {getUser})(Dashboard);