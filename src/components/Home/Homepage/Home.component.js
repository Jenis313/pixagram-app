import React, { Component } from 'react'
import Sidebar from '../../Common/Sidebar/Sidebar.component';
import './Home.component.css'
import PostCard from '../Post_card/Post_card.component';
import ProfilePic from '../../Common/ProfilePic/ProfilePic.component';
import Loader from '../../Common/Loader/Loader.component';
import { httpClient } from '../../../utils/httpClient';
import { NavLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ErrorHandler } from '../../../utils/errorHandler';


export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            isLoading : false,
             posts : [],
             page : 1
        }
    }

    componentDidMount(){
        this.setState({
            isLoading : true
        })
        console.log('component successfully loaded!');
        httpClient.GET('/post', false)
        .then((results) => {
            // console.log(' data is ----> ',results.data)
            this.setState({
                posts : results.data.posts
            })
        })
        .catch((err) => {
            console.log('error is ---> ', err.data);
            ErrorHandler(err);
        })
        .finally(() => {
            this.setState({
                isLoading : false
            })
        })
    }
    fetchData = () => {
        const { page } = this.state;
        this.setState({ page: this.state.page + 1 });
        httpClient
          .GET(`/post?page=${this.state.page}`)
          .then(res =>
            this.setState({
                posts : this.state.posts.concat(res.data.posts)
            })
          );
      };
    render() {
        let posts; 
         if(this.state.isLoading){
            posts = <Loader />
         }else{
             
           posts =  
            <InfiniteScroll
                dataLength={this.state.posts.length}
                next={this.fetchData}
                hasMore={true}
                loader={<h4 style={{margin : '1em 0'}}>Loading...</h4>}
            >
                {/* can get rid of this InfiniteScroll component and use <> fragment instead if you don't want to use scroll fetch feature*/}
                {
                    this.state.posts.map((post, index) => {
                        return <PostCard data = {post} key = {index} />
                    })
                }
            </InfiniteScroll>
         }  
        return (
            <div className='home-main'>
                <div className="container">
                    {/* <!-- left cont --> */}
                    <section className="main-left">
                        <div className="create-new-location">
                            <ProfilePic 
                                outline = {false}
                                link = {localStorage.getItem('token') ? `/users/${JSON.parse(localStorage.getItem('user'))._id}` : ''}
                            />
                            <div className="create-new-location-btn">
                                <NavLink exact to={"/post/new"}><i className="far fa-plus-square"></i> Create a new post </NavLink>
                                {/* <a href="/post/new"><i className="far fa-plus-square"></i> Create a new post</a> */}
                            </div>
                        </div>
                        <div className="posts-container">
                            {/*load post card */}
                            {posts}
                        </div>
                    </section> 
                    {/* <!-- Right Cont --> */}
                    <section className="main-right">
                        <Sidebar />
                    </section>
                </div>
            </div>
        )
    }
}
