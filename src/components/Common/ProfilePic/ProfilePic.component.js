import React from 'react';
import {NavLink} from 'react-router-dom'
import './ProfilePic.component.css';

export default function ProfilePic(props) {
    // this takes 
    let size = props.size ? props.size : "50px";
    
    const link = props.link ? props.link : '#';
    const img = props.img ? props.img : 'https://res.cloudinary.com/jeniscloud/image/upload/v1645346924/1644291494256-pp_ue535h.png';
    const event = props.e ? props.e : false
    const profile = props.outline
                    ? <div onClick={e => e.stopPropagation()} className='profile-pic-container'>
                        <NavLink to = {link}>
                            <img className='profilePic-img-with-outline' src={img} width={size} height={size} alt="" />
                        </NavLink>
                      </div>
                    : <div onClick={e => e.stopPropagation()} className='profile-pic-container'>
                        <NavLink to = {link}>
                            <img className='profilePic-img-without-outline' src={img} width={size} height={size} alt="" />
                        </NavLink>
                      </div>
    return (
        profile
    )
}
 