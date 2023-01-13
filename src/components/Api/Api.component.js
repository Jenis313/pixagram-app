import React from 'react';
import './Api.component.css';
export default function Api(props) {
    if(props.fromApi){
        setTimeout(() => {
            // if I don't put setTimeout document.queryselector will not recognize header, maybe this function runs before header or something.
            let header = window.document.querySelector('header')
            console.log(header )
            header.classList.add("from_api");
        })
    }
    return (
        <div className='api-main'>
            <h2>Pixagram API</h2>
            <div className='api-main-container'>
                <div className='api-sidebar'>
                    <nav className='api-sidebar-nav'>
                        <ul>
                            <h4>User</h4>
                            <li>
                                <a href='#get-all-users'>Get all users</a>
                            </li>
                            <li>
                                <a href='#get-all-posts-of-a-user'>Get all posts of a user</a>
                            </li>
                            <li>
                                <a href='#get-a-user'>Get a user</a>
                            </li>
                            <li>
                                <a href='#update-users-image'>Update user's image</a>
                            </li>
                            <li>
                                <a href='#update-users-name'>Update user's name</a>
                            </li>
                        </ul>
                        <ul>
                            <h4>Post</h4>
                            <li>
                                <a href='#get-all-posts'>Get all posts</a>
                            </li>
                            <li>
                                <a href='#add-a-new-post'>Add a new post</a>
                            </li>
                            <li>
                                <a href='#comment-on-a-post'>Comment on a post</a>
                            </li>
                            <li>
                                <a href='#like-a-post'>Like a post</a>
                            </li>
                            <li>
                                <a href='#search-posts'>Search Posts</a>
                            </li>
                            <li>
                                <a href='#get-a-post'>Get a post</a>
                            </li>
                            <li>
                                <a href='#delete-a-post'>Delete a post</a>
                            </li>
                        </ul>
                        <ul>
                            <h4>Auth</h4>
                            <li>
                                <a href='#login'>Login</a>
                            </li>
                            <li>
                                <a href='#register'>Register</a>
                            </li>
                        </ul>
                    </nav>
                </div>




                <div className='api-details'>
{/* Users */}
                    <div className='api-details-box'>
                        <h3>Users <span>5</span></h3>
                        <div className='api-details-box-container'>
                            <div className='api-individual-body' id='get-all-users'>
                                <div className='api-box-header api-get'>
                                    <h4>Get all Users | </h4>
                                    <p>GET</p>
                                    <span>http://pixagramweb.herokuapp.com/api/users</span>
                                </div>
                            </div>

                            <div className='api-individual-body' id='get-all-posts-of-a-user'>
                                <div className='api-box-header api-get'>
                                    <h4>Get all posts of a user | </h4>
                                    <p>GET</p>
                                    <span>https://pixagramweb.herokuapp.com/api/users/61de500b3da1c62c37af832e/posts</span>
                                </div>
                            </div>
                            <div className='api-individual-body' id='get-a-user'>
                                <div className='api-box-header api-get'>
                                    <h4>Get a User | </h4>
                                    <p>GET</p>
                                    <span>https://pixagramweb.herokuapp.com/api/users/61de500b3da1c62c37af832e</span>
                                </div>
                            </div>
                            <div className='api-individual-body'id='update-users-image'>
                                <div className='api-box-header api-put'>
                                    <h4>Update user's image | </h4>
                                    <p>PUT</p>
                                    <span>https://pixagramweb.herokuapp.com/api/users/61de500b3da1c62c37af832e</span>
                                    <span className='auth-info'> [auth needed]</span>
                                </div>
                                <div className='api-details-body'>
                                    <p className='api-body-tag'>body</p>
                                    <span className='data-type-api'> | formdata</span>

                                    <div className='api-details-body-inner'>
<pre>
    &#123;
    {`
        fullName : 'Jens Ri',   
        image : 'file:///C:/Users/Dell/Pictures/Logo/Eighttttttttt.jpg'
    `}
    &#125;
</pre>
                                    </div>
                                </div>
                            </div>
                            <div className='api-individual-body' id='update-users-name'>
                                <div className='api-box-header api-patch'>
                                    <h4>Update user's name | </h4>
                                    <p>PATCH</p>
                                    <span>https://pixagramweb.herokuapp.com/api/users/61de500b3da1c62c37af832e | </span>
                                    <span className='auth-info'> [auth needed]</span>
                                </div>
                                <div className='api-details-body'>
                                    <p className='api-body-tag'>body</p>
                                    <span className='data-type-api'> | application/json</span>
                                    <div className='api-details-body-inner'>
<pre>
    &#123;
    {`
        fullName : 'Jens Ri'   
    `}
    &#125;
</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
{/* Posts */}
                    <div className='api-details-box'>
                        <h3>Posts <span>7</span></h3>
                        <div className='api-details-box-container' >
                            <div className='api-individual-body' id='get-all-posts'>
                                <div className='api-box-header api-get'>
                                    <h4>Get all posts | </h4>
                                    <p>GET</p>
                                    <span>https://pixagramweb.herokuapp.com/api/post</span>
                                </div>
                            </div>
                            <div className='api-individual-body' id='add-a-new-post'>
                                <div className='api-box-header api-post'>
                                    <h4>Add a new post | </h4>
                                    <p>POST</p>
                                    <span>https://pixagramweb.herokuapp.com/api/post/new</span>
                                    <span className='auth-info'> [auth needed]</span>
                                </div>
                                <div className='api-details-body'>
                                    <p className='api-body-tag'>body</p>
                                    <span className='data-type-api'> | formdata</span>
                                    <div className='api-details-body-inner'>
<pre>
    &#123;
    {`
        title : 'Melbouorne City',   
        description : 'post description',
        tags : 'melbourne, flinders',
        image : 'file:///C:/Users/Dell/Pictures/Logo/Eighttttttttt.jpg'
    `}
    &#125;
</pre>
                                    </div>
                                </div>
                            </div>
                            <div className='api-individual-body' id='comment-on-a-post'>
                                <div className='api-box-header api-post'>
                                    <h4>Comment on a post | </h4>
                                    <p>POST</p>
                                    <span>https://pixagramweb.herokuapp.com/api/post/621461c3b4b8e1f204538e01/comment</span>
                                    <span className='auth-info'> [auth needed]</span>
                                </div>
                                <div className='api-details-body'>
                                    <p className='api-body-tag'>body</p>
                                    <span className='data-type-api'> | application/json</span>
                                    <div className='api-details-body-inner'>
<pre>
    &#123;
    {`
        message : 'lol',   
        commentsCount : '2'
    `}
    &#125;
</pre>
                                    </div>
                                </div>
                            </div>
                            <div className='api-individual-body' id='like-a-post'>
                                <div className='api-box-header api-post'>
                                    <h4>Like a post | </h4>
                                    <p>POST</p>
                                    <span>https://pixagramweb.herokuapp.com/api/post/621461c3b4b8e1f204538e01/like</span>
                                    <span className='auth-info'> [auth needed]</span>
                                </div>
                                <div className='api-details-body'>
                                    <p className='api-body-tag'>body</p>
                                    <span className='data-type-api'> | application/json</span>
                                    <div className='api-details-body-inner'>
<pre>
    &#123;
    {`
        likes : ['array of users id'],   
        likesCount : '2'
    `}
    &#125;
</pre>
                                    </div>
                                </div>
                            </div>

                            <div className='api-individual-body' id='search-posts'>
                                <div className='api-box-header api-get'>
                                    <h4>Search posts| </h4>
                                    <p>GET</p>
                                    <span>https://pixagramweb.herokuapp.com/api/post/search</span>
                                </div>
                            </div>
                            <div className='api-individual-body' id='get-a-post'>
                                <div className='api-box-header api-get'>
                                    <h4>Get a Post | </h4>
                                    <p>GET</p>
                                    <span>https://pixagramweb.herokuapp.com/api/post/61de500b3da1c62c37af832e</span>
                                </div>
                            </div>
                            <div className='api-individual-body' id='delete-a-post'>
                                <div className='api-box-header api-delete'>
                                    <h4>Delete a Post | </h4>
                                    <p>DELETE</p>
                                    <span>https://pixagramweb.herokuapp.com/api/post/61de500b3da1c62c37af832e</span>
                                    <span className='auth-info'> [auth needed]</span>
                                </div>
                            </div>
                        </div>
                    </div>
{/* Auth */}
                    <div className='api-details-box'>
                        <h3>Auth <span>2</span></h3>
                        <div className='api-details-box-container'>
                            <div className='api-individual-body' id='register'>
                                <div className='api-box-header api-post'>
                                    <h4>Register | </h4>
                                    <p>POST</p>
                                    <span>https://pixagramweb.herokuapp.com/api/auth/register</span>
                                </div>
                                <div className='api-details-body'>
                                    <p className='api-body-tag'>body</p>
                                    <span className='data-type-api'> | application/json</span>
                                    <div className='api-details-body-inner'>
<pre>
    &#123;
    {`
        fullName : 'Jens Ri', 
        email : 'email@email.com',
        username : 'flappybird',
        password : 'mysupersecretpassword'
    `}
    &#125;
</pre>
                                    </div>
                                </div>
                            </div>
                            <div className='api-individual-body' id='login'>
                                <div className='api-box-header api-post'>
                                    <h4>Login | </h4>
                                    <p>POST</p>
                                    <span>https://pixagramweb.herokuapp.com/api/auth/login</span>
                                </div>
                                <div className='api-details-body'>
                                    <p className='api-body-tag'>body</p>
                                    <span className='data-type-api'> | application/json</span>
                                    <div className='api-details-body-inner'>
<pre>
    &#123;
    {`
        email : 'email@gmail.com',
        password : 'Secretpassword@0'
    `}
    &#125;
</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                
            </div>
        </div>
    )
}
