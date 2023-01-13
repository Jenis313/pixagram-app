import React, { Component } from 'react';
import { httpClient } from '../../utils/httpClient';
import Loader from '../Common/Loader/Loader.component';
import PostCard from '../Home/Post_card/Post_card.component';
import './Profile.component.css';
import { ErrorHandler } from '../../utils/errorHandler';
import { NavLink } from 'react-router-dom';


export default class Profile extends Component {
    constructor(){
        super();
        this.state = {
            isLoading : false,
             posts : [],
             user : {}
        }
    }
    componentDidMount(){
        this.setState({
            isLoading : true
        })
        const userId = this.props.match.params['userId'];
        // For user details
        httpClient.GET(`/users/${userId}`, false)
        .then((user) => {
            // console.log('user->', user);
            this.setState({
                user : {
                    ...user.data
                }
            })
            // For posts
            httpClient.GET(`/users/${userId}/posts`, false)
            .then((results) => {
                // console.log(' data is ----> ',results.data);
                this.setState({
                    posts : [...results.data]
                })
            })
            .catch((err) => {
                console.log('error is ---> ', err.response);
                ErrorHandler(err);
            })
        })
        .catch((err) => {
            console.log('errr in component did mount Profile component -> ', err.response)
            ErrorHandler(err);
        })
        .finally(() => {
            this.setState({
                isLoading : false
            })
            // console.log('state---> ', this.state);
        })
    }
    componentDidUpdate(){
        //if user is watching someone else's profile and he clicks his profile through Navbar then he should get his own data, which can be done from this place.
    }
    render() {
        const loggedInUserId = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('user'))._id : false
        const userProfileId = this.state.user._id 

        // console.log('id',userProfileId, loggedInUserId)
        let posts; 
            if(this.state.isLoading){
                posts = <Loader />
            }else{
            // console.log(this.state)  
                posts =  <>
                    {
                        this.state.posts.map((post, index) => {
                            return <PostCard data = {post} key = {index} />
                        })
                    }
                </>
            } 
        return (
            <div className='profile-main'>
                <div className="container">
                    {/* <!-- left cont --> */}
                    <section className="main-left">
                        {/* if not valid user id request */}
                        {
                            this.state.isLoading===false && Object.keys(this.state.user).length === 0
                            ? <h3>User not found</h3>
                            : <h1><span>{this.state.user.fullName}</span>'s posts</h1>
                        }
                        <div className="posts-container">
                            {posts}
                        </div>
                    </section> 
                    {/* <!-- Right Cont --> */}
                    <section className="main-right">
                        <div className="profile-container">
                            <div className="top-color"></div>
                            <div className="current-profile-pic">
                                <img src={this.state.user.image ? this.state.user.image : 'https://res.cloudinary.com/jeniscloud/image/upload/v1645346924/1644291494256-pp_ue535h.png'} width="100px" alt="" />
                            </div>
                            {
                                loggedInUserId ===  userProfileId
                                ?   <div className="edit-profile">
                                        <NavLink to={`/users/edit/${this.state.user._id}`}><i className="fas fa-cog"></i></NavLink>
                                    </div> 
                                : <></>
                            }
                                
                            <div className="profile-info">
                                <p className="full-name">{this.state.user.fullName}</p>
                                <p className="username">@<span>{this.state.user.username}</span></p>
                            </div>
                            {
                                 loggedInUserId ===  userProfileId
                                ?   <div className="new-post-profile">
                                        <NavLink to={'/post/new'}>Add a new post</NavLink>
                                    </div> 
                                : <></>
                            }
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
