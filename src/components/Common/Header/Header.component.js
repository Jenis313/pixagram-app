import React, { Component } from 'react';
import './Header.component.css';
import Logo from './../../../images/pixagram.png'
import mobileLogo from './../../../images/pixagram-mobile.png'
import ProfilePic from "../ProfilePic/ProfilePic.component";
import { NavLink, withRouter } from "react-router-dom";
import { httpClient } from '../../../utils/httpClient';
import { ErrorHandler } from '../../../utils/errorHandler';

import {GlobalContext} from '../../../context/GlobalState'; 
// Problem with not using GlobalContext is that whenever we update profile picture from editProfile component, it will not re-render Header because there is no way to update state of Header from editProfile but now we have GlobalContext state which can be used and updated form any Components as long as they are inside Provider.
//https://www.youtube.com/watch?v=XLJN4JfniH4
//https://stackblitz.com/edit/react-rzuyc3?file=MyContext.js
//https://www.youtube.com/watch?v=ch8kiuRJc7I&t=517s

function logout(history){
    localStorage.clear();
    history.push('/home')
}

class Header extends Component {
     // You should set this when using `this.context`.
    static contextType = GlobalContext;

    constructor(){
        super()
        this.state = {
            query : '',
            profileImg : ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount(){
        if(localStorage.getItem('token')){
            httpClient.GET(`/users/${JSON.parse(localStorage.getItem('user'))._id}`)
            .then((data) => {
                // console.log('logged in user is -> ',data.data.image);
                // console.log('context',this.context.state)
                // Set image in global context
                this.context.state.setCurrentProfile(data.data.image);
                // We would not need to use this.context to set image in GLobalContext if it was inside Provider but in here we are using outside Provider(componentDidMount so this.context is being used)
            })
            .catch((err) => {
                ErrorHandler(err)
            })
        }
    }
    // Mobile hamburger click
    handleHamburgerClick(){
        const headerContent = document.querySelectorAll('.headerContent');
        headerContent.forEach(element => {
            element.classList.add('headerContent-mobile')
        });
    }
    // Mobile menu back click
    handleMobileBackKey(){
        const headerContent = document.querySelectorAll('.headerContent');
        headerContent.forEach(element => {
            element.classList.remove('headerContent-mobile')
        });
    }
    // Search Operation
    handleChange(e){
        this.setState({
            query : e.target.value
        })
    }
    // Search Operation
    handleSubmit(e, history, location){
        // when you use this.history.push(something), it will redirect to {pathname} and you can also pass additional data to the component of the path. To access data from that {pathname}(component) you can use this.props.history.... in other words if you do history.push(..) it will pass data as props and you can access those props in the same way you would access in a normal component. eg. I am passing pathname and search properties from this history.push and I can access those data form SearchPost Component using this.props.history. And also SearchComponent will be rerendered everytime I pass something new to history.push because it is a props for SearchComponent and as I change the props(data inside history.push), SearchComponent also gets re-rendered.
        // https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4, https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4/45263164#45263164 
        history.push({
            pathname: location,
            search: this.state.query,
            state: { query: this.state.query }
          })
        e.preventDefault();
       
    }
    render() {
        // When user clicks a link that lives inside menubar in mobile device it should remove the headerContent-mobile class
        const onclickhidemenu = document.querySelectorAll('.onclickhidemenu');
        onclickhidemenu.forEach((el) => {
            el.addEventListener('click', () => {
                const headerContent = document.querySelectorAll('.headerContent');
                headerContent.forEach(element => {
                    element.classList.remove('headerContent-mobile')
                });
            })
        })

        let headerContent;
        if(localStorage.getItem('token')){
            headerContent = <ul className='headerContent '>
                                <li className="profile-link">
                                    <ProfilePic
                                        outline = {true}
                                        size = "35px"
                                        link = {`/users/${JSON.parse(localStorage.getItem('user'))._id}`}
                                        img = {this.context.state.currentProfilePic}
                                    />
                                    <span className="mobile-profile-replace only-mobile onclickhidemenu">
                                        <NavLink to = {`/users/${JSON.parse(localStorage.getItem('user'))._id}`}>Profile</NavLink>
                                    </span>
                                </li>
                                <li className="logout-link">
                                    <button onClick={() => {
                                        logout(this.props.history)
                                    }}><i className="fas fa-sign-out-alt"></i></button>
                                    <span className='mobile-logout only-mobile onclickhidemenu' onClick={() => {
                                        logout(this.props.history)
                                    }}>
                                        Logout
                                    </span>
                                </li> 
                                <i onClick = {this.handleMobileBackKey} className="fas fa-times hide-menu"></i>
                            </ul>
        }else{
            headerContent = <ul className='headerContent '>
                                <li className="login-link onclickhidemenu">
                                    <NavLink to = "/login">Login</NavLink>
                                    {/* under the hood Navlink uses a tag so we are giving style to .login-link>a */}
                                </li>
                                <li className="register-link onclickhidemenu">
                                    <NavLink to = "/register">Register</NavLink>
                                </li>
                                <i onClick = {this.handleMobileBackKey} className="fas fa-times hide-menu"></i>
                            </ul>
        }
        return (
            <header>
                <div className="container">
                    <div className="header--logo"><NavLink to = "/home"><img src={Logo} alt="" className="logo-img" /></NavLink></div>
                    <div className="header--logo--mobile"><NavLink to = "/home"><img src={mobileLogo} alt="" className="logo-img" /></NavLink></div>
                    <div className="header--search-bar">
                        <form onSubmit={(e) => {
                                this.handleSubmit(e, this.props.history, `/post/search`)
                        } } action="#">
                            <div className="search-cont">
                                <label htmlFor="post-search"></label>
                                <input onChange={this.handleChange} type="text" className="post-search" name="post-search" placeholder="Search Posts" />
                            </div>
                            <div className="submit">
                                <label htmlFor="submit"></label>
                                <button className="submit" name="submit"><i className="fas fa-search"></i></button>
                            </div>
                        </form>
                    </div>
                    <nav>
                        {headerContent}
                    </nav>
                    <div className="hamburger" onClick = {this.handleHamburgerClick}>
                        <i className="fas fa-bars"></i>
                    </div>
                </div>
            </header>
        )

    }
}

// Header.contextType = GlobalContext;
export default Header = withRouter(Header)