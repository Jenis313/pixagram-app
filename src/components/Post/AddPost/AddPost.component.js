import React, { Component } from 'react';
import './AddPost.component.css';
import Sidebar from '../../Common/Sidebar/Sidebar.component';
import { NavLink } from 'react-router-dom';
import { Notify } from '../../../utils/notify';
import { ErrorHandler } from '../../../utils/errorHandler';
import { httpClient } from '../../../utils/httpClient';

let defaultForm = {
    title: '',
    description: '',
    tags: '',    
}
export default class AddPost extends Component {
    constructor(){
        super()
        this.state = {
            data : {
                ...defaultForm
            },
            errors : {
                ...defaultForm
            },
            image : []
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removePreviewImage = this.removePreviewImage.bind(this);
        
    }
    handleChange(e){
        const {name, value, type, files} = e.target;
        // console.log(name, value, files)
        if(type === 'file'){
            this.setState({
                image : [files[0]]
            })
        }
        this.setState((prevState) => ({
            data : {
                ...prevState.data,
                [name] : value
            }
        }))
    }
    handleSubmit(e){
        e.preventDefault();
        httpClient.UPLOAD('POST','/post/new', this.state.data,this.state.image)
            .then((response) => {
                Notify.showSuccess('Post added successfully!')
                this.props.history.push('/home')
            })
            .catch((err) => {
                // console.log('error is-->', err.response);
                ErrorHandler(err);
            })

    }
    removePreviewImage(){
        this.setState({
            image : []
        })
    }
    render() {
        // console.log('this state ----> ', this.state)
        let previewImage;
        if(this.state.image.length){
            previewImage =  <div className='previewImageAddPost'>
                                <img src={URL.createObjectURL(this.state.image[0])} />
                                <i onClick={this.removePreviewImage} className="far fa-times-circle"></i>
                            </div>
        }else{
            previewImage = <div className="icon"><i className="far fa-image"></i></div>
        }
        let content;
        if(localStorage.getItem('token')){
            content = 
                    <>
                        <h1>Create a new post</h1>
                        <div className="post-form-container">
                            <form onSubmit={this.handleSubmit} encType='multipart/form-data' className="new-post-form" action="/" method="post">
                                <div className="input-container-post">
                                    <label htmlFor="post-name" ></label>
                                    <input onChange={this.handleChange} type="text" id="post-name" name="title" placeholder="Post title" required />
                                </div>
                                <div className="input-container-post">
                                    <label htmlFor="post-description" ></label>
                                    <textarea onChange={this.handleChange} name="description" id="post-description" cols="30" rows="10" placeholder="Post description..."></textarea>
                                </div>
                                <div className="input-container-post upload-image">
                                    {previewImage}
                                    <p>Upload an image</p>
                                    <label htmlFor="post-image" >Browse files</label>
                                    <input onChange={this.handleChange} type="file" name="image" id="post-image" accept="image/*"/>
                                    {/*Make a preview container here  */}
                                </div>
                                <div className="input-container-post post-tags-cont">
                                    <label htmlFor="post-tags" >Insert upto 5 tags seperated by commas. </label>
                                    <input onChange={this.handleChange} type="text" id="post-tags" name="tags" placeholder="" />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="post-submit"></label>
                                    <button name="submit" id="post-submit">Submit for review</button>
                                </div>
                            </form>
                        </div>
                    </>
        }else{
            content = 
                    <div className="post-form-container post-form-no-auth">
                        <h2 className="login-req-new-post">Please <NavLink exact to = "/login">login</NavLink> to create a new post!!</h2>
                        <div className="no-auth-post-image">
                            <i className="fas fa-edit"></i>
                        </div>
                    </div> 
        }
        return (
            <div className='new-post-main'>
                <div className="container">
                    {/* <!-- left cont --> */}
                    <section className="main-left">
                        {content}
                    </section> {/*<!-- Main left -->*/}

                    {/* <!-- Right Cont --> */}
                    <section className="main-right">
                        <Sidebar />
                    </section>
                </div>
            </div>
        )
    }
}
