import React, { Component } from 'react'
import './SearchPost.component.css'
import PostCard from '../../Home/Post_card/Post_card.component';
import Loader from '../../Common/Loader/Loader.component';
import { httpClient } from '../../../utils/httpClient';
import { ErrorHandler } from '../../../utils/errorHandler';
export default class SearchPost extends Component {
    constructor(){
        super();
        this.state = {
            isLoading : false,
             posts : [],
             query : ''
        }
    }
    // In the first history.push this will run
    componentDidMount(){
        this.setState({
            isLoading : true,
            query : this.props.history.location.search
        })
        httpClient.GET(`post/search?q=${this.props.history.location.search}`, false)
        .then((results) => {
            console.log(' data is ----> ',results.data)
            this.setState({
                posts : results.data
            })
        })
        .catch((err) => {
            console.log('error is ---> ', err);
            ErrorHandler(err);
        })
        .finally(() => {
            this.setState({
                isLoading : false
            })
        })
        // console.log('Did update ---> props', this.props)
    }

    // after first history.push the props gets updated and didUpdate will run() we don't want it to run if state of this component changes but we want it to run if props(created by history.push) changes so we are using a condition inside.
    componentDidUpdate(){
      if(this.state.query !== this.props.history.location.search){
            this.setState({
                isLoading : true,
                query : this.props.history.location.search
            })
            httpClient.GET(`post/search?q=${this.props.history.location.search}`, false)
            .then((results) => {
                // console.log(' data is ----> ',results.data)
                this.setState({
                    posts : results.data
                })
            })
            .catch((err) => {
                console.log('error is ---> ', err);
            })
            .finally(() => {
                this.setState({
                    isLoading : false
                })
            })
            // console.log('Did update ---> props', this.props)
        }
    }

    render() {
        let posts; 
         if(this.state.isLoading){
            posts = <Loader />
         }else if(this.state.posts.length<1){
            posts = <h1>No results found: </h1>
         }else{
             
           posts =  <>
                {
                    this.state.posts.map((post, index) => {
                        return <PostCard data = {post} key = {index} />
                    })
                }
            </>
         }  
        return (
            <div className='home-main'>
                <div className="container">
                    {/* <!-- left cont --> */}
                    <section className="main-left">
                        {this.state.posts.length>0 ? <h2>Search Results: </h2> : <></>}
                        <div className="posts-container">
                            {/*load post card */}
                            {posts}
                        </div>
                    </section> 
                    {/* <!-- Right Cont --> */}
                    <section className="main-right">
                    </section>
                </div>
            </div>
        )
    }
}
