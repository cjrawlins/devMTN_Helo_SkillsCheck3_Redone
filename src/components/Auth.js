import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {loginUser} from '../redux/userReducer';


class Auth extends Component {
    constructor() {
        super();

        this.state = {
            user: {
                username: '',
                password: ''
            }
        }
    }


    changeHandler = (e) => {
        this.setState( {
            [e.target.name]: e.target.value
        } )
    }

    login = () => {
        console.log("Log In Called")
        const {username, password} = this.state;
        axios.post('/api/auth/login', {username, password}).then(res => {
            this.props.loginUser( res.data );
            this.props.history.push('/dashboard');
            console.log("Sending Login Info")
        }).catch( err => {
            console.log(err)
            alert('Login Failed. Check Connection or Login Info')
        } )
    }

    register = () => {
        console.log("Register Called")
        const {username, password} = this.state;
        const profilePic = `https://robohash.org/${username}.png`
        axios.post('/api/auth/register', {username, password, profilePic}).then(res => {
            this.props.loginUser( res.data );
            this.props.history.push('/dashboard')
            console.log("Sending Resister Info")
        }).catch( err => {
            console.log(err)
            alert('Register Failed')
        } )
    }

    render() {
        return(
            <div className="Auth">
                <div className="auth-login-container">
                    <img className="auth-logo" src="./media/helo_logo.png" alt="./media/no_image.png" />
                    <h1 className="auth-title">Helo</h1>
                    <form className="auth-form">
                        <h2 className="auth-form-title">Username:</h2>
                        <input className="auth-form-input" onChange={ e => this.changeHandler(e) } name="username" type="text" placeholder="username" />
                        <h2 className="auth-form-title">Password:</h2>
                        <input className="auth-form-input" onChange={ e => this.changeHandler(e) } name="password" type="password" placeholder="password" />
                    </form>
                    <div className="auth-button-container">
                        <button className="auth-button" onClick={this.login}>Login</button>
                        <button className="auth-button" onClick={this.register}>Register</button>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {loginUser})(Auth);

