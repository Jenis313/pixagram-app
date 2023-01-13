import React from 'react';
import ProfilePic from '../../../Common/ProfilePic/ProfilePic.component';
import './Comment.component.css';

export default function Comment(props) {
    let comment = props.comment;
    // console.log('Comments props -->', comment)
    const createdAt = comment.createdAt.slice(0, 10)
    return (
        <div>
            <div className="indiv-comment">
                <ProfilePic 
                    outline = {false}
                    link = {`/users/${comment.user._id}`}
                    img = {comment.user.image}
                />
                <div className="comment-and-name">
                    <h5> {comment.user.fullName} </h5>
                    <small>{createdAt}</small>
                    <p>{comment.message}</p>
                </div>
            </div>
        </div>
    )
}
