import React, { useState } from "react";
import "./Microphone.css"; // Import the CSS file for the animation

const Microphone = ({ startFunction, stopFunction }) => {
    const [status, setStatus] = useState(false);

  return (
    <div class="microphone_container">
        <button id="speech" class="btn p-5" active={status} onClick={(status ? setStatus(false) : setStatus(true))}>
        <svg fill="#000000" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 8c0 4.418-3.59 8-8 8-4.418 0-8-3.59-8-8h2c0 3.307 2.686 6 6 6 3.307 0 6-2.686 6-6h2zM4 3.996a4 4 0 0 1 8 0v4.008a4 4 0 0 1-8 0V3.996zM8 2a2 2 0 0 0-2 2v4a2 2 0 1 0 4 0V4a2 2 0 0 0-2-2zM6 5h4v2H6V5z" fillRule="evenodd"></path> </g></svg>
        </button>
        {
            status && (<div class="pulse-ring"></div>)
        }
        
    </div>
    
  );
};

export default Microphone;