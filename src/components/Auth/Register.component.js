import React, { Component } from 'react';
import './Auth.component.css';
import Pixagram from './../../images/pixagram.png';
import { httpClient } from '../../utils/httpClient';
import { NavLink } from 'react-router-dom';
import { Notify } from '../../utils/notify';
// localStorage.getItem('myData');
const defaultForm = {
    fullName : '',
    email : '',
    username : '',
    password : '',
}
export default class Register extends Component {
    constructor(){
        super()
        this.state = {
            data : {
                ...defaultForm
            },
            errors : {
                ...defaultForm
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        let {name , value} = e.target;
        // console.log(name, value)
        this.setState((prevState) => {
                return {
                    data : {
                        ...prevState.data,
                        [name] : value
                    },
                    errors : {
                        ...prevState.errors,
                        [name] : ''
                    }
            }
        })

    }
    handleSubmit(e){
        e.preventDefault() 
        // console.log('state---->', this.state);
        httpClient.POST(`/auth/register`, this.state.data)
        .then((response) => {
            // console.log('response is -> ', response);
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            this.props.history.push('/home')
            Notify.showSuccess('Register Successful')

        })
        .catch((err) => {
            // TODO : This error is actually created by expresss Validator there may be other errors which may need to be handled in other ways
            console.log(err.response.data.err);
            this.setError(err.response.data.err);

        })
    }
    setError(errArray){
        // set errors to the state sent by server(express-validator)
        errArray.forEach((error) => {
            this.setState((prevState) => ({
                errors : {
                    ...prevState.errors,
                    [error.param] : error.msg
                }
            }))
        })
    }
    render() {
        // console.log('stateeee --> ', this.state);
        return (
            <div className="auth-main">
                    <div className="form-container">
                        <div className="auth-form-upper">
                            <img src={Pixagram} alt="" className="logo-img" />
                            <p className="register-descript">Register to add posts and interact with posts!</p>
                            <form onSubmit={this.handleSubmit} method="post">
                                <div className="input-container">
                                    <label htmlFor="email" ></label>
                                    <input type="email" id="email" name="email" placeholder="Email address" onChange={this.handleChange} />
                                    <p className='register-form-error'>{this.state.errors.email}</p>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="fullName" ></label>
                                    <input type="text" id="fullName" name ="fullName" placeholder="Full name" onChange={this.handleChange} />
                                    <p className='register-form-error'>{this.state.errors.fullName}</p>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="username" ></label>
                                    <input type="text" id="username" name="username" placeholder="Username" onChange={this.handleChange} />
                                    <p className='register-form-error'>{this.state.errors.username}</p>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="password" ></label>
                                    <input type="password" id="password" name="password" placeholder="Password" onChange={this.handleChange} />
                                    <p className='register-form-error'>{this.state.errors.password}</p>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="submit"></label>
                                    <button id="submit" id="submit">Register</button>
                                </div>
                            </form>
                            <p className="terms-accept">By signing up, you agree to our Terms, Data Policy and Cookie Policy.</p>
                        </div>
                        <div className="auth-lower">
                            <p>Have and account? <NavLink to={'/login'}>Login</NavLink></p>
                        </div>
                    </div>
            </div>
        )
  }
}

// export default function Register(){
//     return (
//             <div className="auth-main">
//                 {/* <% if(!currentUser){%> */}
//                 <div className="form-container">
//                     <div className="auth-form-upper">
//                         <img src={Pixagram} alt="" className="logo-img" />
//                         <p className="register-descript">Register to see beautiful places around the world!</p>
//                         <form action="/auth/register" method="post">
//                             <div className="input-container">
//                                 <label for="email" ></label>
//                                 <input type="email" id="email" name="email" placeholder="Email address" />
//                             </div>
//                             <div className="input-container">
//                                 <label for="fullName" ></label>
//                                 <input type="text" id="fullName" name ="fullName" placeholder="Full name" />
//                             </div>
//                             <div className="input-container">
//                                 <label for="username" ></label>
//                                 <input type="text" id="username" name="username" placeholder="Username" />
//                             </div>
//                             <div className="input-container">
//                                 <label for="password" ></label>
//                                 <input type="password" id="password" name="password" placeholder="Password" />
//                             </div>
//                             <div className="input-container">
//                                 <label for="submit"></label>
//                                 <button id="submit" id="submit">Register</button>
//                             </div>
//                         </form>
//                         <p className="terms-accept">By signing up, you agree to our Terms, Data Policy and Cookie Policy.</p>
//                     </div>
//                     <div className="auth-lower">
//                         <p>Have and account? <a href="/auth/login">Login</a></p>
//                     </div>
//                 </div>
//                 {/* <%}else{%> */}
//                     {/* <div className="already-loggedin">
//                         <p style={{fontSize: "1.4em"}}>You are already logged in! <a style={{fontWeight: "600", textDecoration: "underline"}} href="/logout">Logout</a> to switch account or to create a new account!</p>
//                     </div> */}
//                 {/* <% } %>  */}
                    
//             </div>

//     )
// }