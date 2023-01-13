// While making a child component try to use as much as props as you can and don't try to create state which comes from props because if the you make state in child component based on props the the component will not rerender even after the change in props 
import React, { Component } from 'react';
import './Post_card.component.css'
import ProfilePic from '../../Common/ProfilePic/ProfilePic.component';
import { NavLink, withRouter } from 'react-router-dom';
import { ErrorHandler } from '../../../utils/errorHandler';
import { httpClient } from '../../../utils/httpClient';
const BASE_URL = process.env.REACT_APP_BASE_URL;

class PostCard extends Component{
    constructor(){
        super()
        this.state = {
            likes: [],
            likesCount: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleDislike = this.handleDislike.bind(this);
    }
    componentDidMount(){
        // console.log('props data Post_card--> ', this.props.data);
        this.setState({
            likes : [...this.props.data.likes],
            likesCount : this.props.data.likesCount
        }, () => {
            // console.log('State after componentDidMount PostCard component-> ', this.state)
        })

    }

    // https://stackoverflow.com/questions/27864951/how-to-access-a-childs-state-in-react/27875018#27875018
    handleChange(history, location){
        history.push(location)
        // history.push can only be used with BrowserRouter so that I export withRouter too use props.history.push()/this.props.history.push()
        // If a component is inside BrowserRouter then this.props.history.push(location) can be used to redirect to other component on a particular action like onclick etc.history object is automatically passed as a props to a component if that component is inside BrowserRouter
    }
    handleLike(e){
        // if handleLike is called, put the userId into the likes array of the state and also increase likesCount
        let userId = JSON.parse(localStorage.getItem('user'))._id;
        e.stopPropagation()
        // console.log('like userid---> ', userId);
        this.setState((prevState) => ({
            likes : [...prevState.likes, userId],
            likesCount : prevState.likes.length + 1 //don't do likesCount + 1 because initial likesCount is equal to ''
        }), () => {
            // console.log('state after like', this.state)
            // post/61dfe50b955985df8f17392b/like
            const likeData = {
                likes : this.state.likes,
                likesCount : this.state.likesCount
            }
            httpClient.POST(`/post/${this.props.data._id}/like`, likeData, true)
            .then((response) => {
                // console.log('response from server --> ',response)
            })
            .catch((err) => {
                console.log('error in like--> ', err);
                ErrorHandler(err)
            })
        })

    }
    handleDislike(e){
        e.stopPropagation()
        let userId = JSON.parse(localStorage.getItem('user'))._id;
        // console.log('dislike userid---> ', userId);
        this.setState((prevState) => ({
            likes : [...prevState.likes].filter(e => e !== userId),
            likesCount : prevState.likesCount - 1
        }), () => {
            // console.log('state after dislike', this.state)
            const disLikeData = {
                likes : this.state.likes,
                likesCount : this.state.likesCount
            }
            httpClient.POST(`/post/${this.props.data._id}/like`, disLikeData, true)
            .then((response) => {
                // console.log('response from server --> ',response)
            })
            .catch((err) => {
                console.log('error in like--> ', err);
                ErrorHandler(err)
            })
        })

    }
    handleShare(e){
        e.stopPropagation()
        // https://pixagramweb.herokuapp.com/post/621461c3b4b8e1f204538e01
        navigator.clipboard.writeText(`https://pixagramweb.herokuapp.com/post/${this.props.data._id}`);
    }
    render(){
        let postData = this.props.data;
        // console.log('postData --> ', postData)
        // If user is logged in can interect if not can't interect just see number of likes and comments 
        let interactContent;
        if(localStorage.getItem('token')){
                        ///////////////////////////////////////////////////////////////// prepare data for interactContent
                        let likeContent;
                        let currentUserId = JSON.parse(localStorage.getItem('user'))._id;
                        let isLiked = this.state.likes.some((element) => {
                            // console.log('element --> ', element)
                            return element === currentUserId
                            // return value true means this user has already liked the post
                        })
                        // console.log('currentUser and isLiked -> ', currentUserId, isLiked);
                        if(isLiked){
                            likeContent = 
                                <>
                                    <i 
                                        onClick={(e) => {
                                            this.handleDislike(e)
                                        }}
                                        className="far fa-thumbs-up post-interact-icon" style={{color : '#1DBF73', cursor: "pointer"}}
                                    ></i>
                                    <p className="post-like-count" style={{color : '#1DBF73'}}><span className='total-like'>{this.state.likesCount}</span> likes</p>
                                </>
                        }else{
                            likeContent = 
                                <>
                                    <i 
                                        onClick={(e) => {
                                            this.handleLike(e)
                                        }} 
                                        style={{cursor: "pointer"}}
                                        className="far fa-thumbs-up post-interact-icon"
                                    ></i>
                                    <p className="post-like-count"><span className='total-like'>{this.state.likesCount}</span> likes</p>
                                </>
                        }
                        //////////////////////////////////////////////////////////////
                        
            interactContent = 
                <>
                    <div className="post-interact post-like" id = "someid">
                        {likeContent}
                    </div>
                    <div className="post-interact post-comment">
                        <i className="fas fa-comment-alt post-interact-icon"></i>
                        <p className="post-like-count"><span>{postData.commentsCount}</span> comments</p>
                    </div>
                    <div className="post-interact post-share">
                        <i 
                            onClick={(e) => {
                                            this.handleShare(e)
                                        }} className="fas fa-share post-interact-icon">
                        </i>
                    </div>
                </>
        }else{
            interactContent = 
                <>
                    <div className="post-interact post-like" id = "someid">
                        <p className="post-like-count"><span className='total-like'>{postData.likesCount}</span> likes</p>
                    </div>
                    <div className="post-interact post-comment">
                        <p className="post-like-count"><span>{postData.commentsCount}</span> comments</p>
                    </div>
                    <div className="post-interact post-share">
                        <i 
                            onClick={(e) => {
                                            this.handleShare(e)
                                        }} className="fas fa-share post-interact-icon">
                        </i>
                    </div>
                </>
        }


        // console.log('State PostCard ---> ', postData)
        return (
            <div 
                onClick={ //if fromPost is true that means it is being rendered inside Post so, no need to redirect to other pages
                    this.props.fromPost 
                    ? null
                    : () => {
                        this.handleChange(this.props.history, `/post/${postData._id}`)
                    }
                } 
                style={
                    this.props.fromPost 
                        ? {cursor: 'auto'}
                        : {cursor: "pointer"}
                    } 
                className={`post ${this.props.fromPost ? 'bigPost' : ''}`}
                >{/*div opener ends here*/} 
                <div className="post-user">
                    <ProfilePic
                        outline = {true}
                        link = {`/users/${postData.author._id}`}
                        img = {postData.author.image}
                        size = {window.innerWidth < 557 ? '30px' : '50px' }
                    />
                    <NavLink onClick = {
                        (e) => {
                            e.stopPropagation();
                        }
                    } to={`/users/${postData.author._id}`} className= "post-card-profile-username"><span>{postData.author.username}</span></NavLink>
                </div>
                <div className="location-img">
                    <img src={postData.image} width="100%" alt="image" loading="lazy" />
                </div>
                <div className="post-description">
                    <h4 className="location-name">{postData.title}</h4>
                    <p>{postData.description}</p>
                </div>
                <div className="interact">
                    {interactContent}
                </div>
            </div>
        )
    }
}
export default PostCard = withRouter(PostCard)
// if we cannot put some component inside BrowserRouter we can export like this and it is the same
