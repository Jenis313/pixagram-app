import React from "react";
import './style.css'
import AppRouting from "./app.routing";
import {ToastContainer} from 'react-toastify';

// Css for tostify(see docs)
import 'react-toastify/dist/ReactToastify.css';
export default function App(){
    return (
        <div className="main">
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <AppRouting />
        </div>
    )
}