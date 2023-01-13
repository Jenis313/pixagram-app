import React from "react";
import './Sidebar.component.css';
export default function Sidebar() {
    const d = new Date();
    let currentYear = d.getFullYear();
    return (
        <div className="footer">
            <div className="footer-main-cont">
                <div className="footer-left">
                    <ul>
                        <li><a href="#">Help</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Press</a></li>
                        <li><a href="#">Tags</a></li>
                    </ul>
                </div>
                <div className="footer-right">
                    <ul>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Terms</a></li>
                        <li><a href="#">Content Policy</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Advertise</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Admin Panel</a></li>
                    </ul>
                </div>
            </div>
            <div className="copy-right">
                <p>Pixagram Inc © {currentYear} . All rights reserved</p>
            </div>
        </div>
    )
}
