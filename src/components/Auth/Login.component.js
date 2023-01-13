import React, { Component } from 'react';
import {GlobalContext} from '../../context/GlobalState'; //import globalContext
import './Auth.component.css';
import Pixagram from './../../images/pixagram.png';
import {  NavLink } from 'react-router-dom';
import { httpClient } from '../../utils/httpClient';
import { ErrorHandler } from '../../utils/errorHandler';
const defaultForm = {
    email: '',
    password: ''
}

export default class Login extends Component {
    // You should set this when using `this.context`.
    static contextType = GlobalContext;

    constructor(){
        super()
        this.state = {
            data: {
                ...defaultForm
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        let token = localStorage.getItem('token')
        if(token){
            this.props.history.push('/home')
        }
    }
    handleChange(e){
        let {name , value} = e.target;
        // console.log(name, value)
        this.setState((prevState) => {
                return {
                    data : {
                    ...prevState.data,
                    [name] : value
                }
            }
        })
    }
    handleSubmit(e){
        e.preventDefault() 
        // console.log('login state---->', this.state);
        httpClient.POST(`/auth/login`, this.state.data)
        .then((response) => {
            // console.log('response is -> ', response);
            this.context.state.setCurrentProfile(response.data.user.image);
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            this.props.history.push('/home')
            // notify.showSuccess('Register Successful')
        })
        .catch((err) => {
            // console.log(err.response);
            // if you just log err(from parameter) it will show javascript error not the error from server, to see server error(custom error message from server) you need to log--> err.response (and this is related with axios)
            // more --> // https://github.com/axios/axios/issues/960#issuecomment-309287911
            // This error will be properly displayed in the form later but for now just display through error handler function.
            // TODO: display error properly in the form
            ErrorHandler(err);
        })
    }
    render() {
        return (
            <div className="auth-main">
                    <div className="form-container">
                        <div className="auth-form-upper">
                            <img src={Pixagram} alt="" className="logo-img" />
                            <form action="/auth/login" onSubmit={this.handleSubmit} method="post">
                                <div className="input-container">
                                    <label htmlFor="email" ></label>
                                    <input onChange={this.handleChange} type="email" id="email" name="email" placeholder="Email address" />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="password" ></label>
                                    <input onChange={this.handleChange} type="password" id="password" name="password" placeholder="Password" />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="submit"></label>
                                    <button id="submit" id="submit">Log In</button>
                                </div>
                            </form>
                            <p className="forget-password">Please don't forget your password 🙏</p>
                        </div>
                        <div className="auth-lower">
                            <p>Don't have an account? 
                                <NavLink to={'/register'}>Register</NavLink>
                            </p>
                        </div>
                    </div>
            </div>
        )
    }
}

