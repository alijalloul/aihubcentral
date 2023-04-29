import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";

import { logout } from "../../redux/User.js"

const Nav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [ user, setUser ] = useState((typeof window !== 'undefined') && JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        const token = user?.token;
        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout(navigate, dispatch);
        }

        if (typeof window !== 'undefined') {
          setUser(JSON.parse(localStorage.getItem("profile")))
        };
    },[location]);

    const handleLogout = () => {
        logout(navigate, dispatch);
        setUser(null);
    }

  return (
    <header className='w-full flex justify-between items-center bg-white px-4 py-4 border-b border-b-[#e6ebf4] sm:px-2'>
        <Link to="/"> 
            <svg fill="#000000" viewBox="0 0 24 24" className='w-[40px] aspect-square'>
                <g id="SVGRepo_bgCarrier" strokeWidth="0">
                </g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round">
                </g>
                <g id="SVGRepo_iconCarrier">
                    <title>OpenAI icon</title>
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z">
                    </path>
                </g>
            </svg>
        </Link>

        <div className=' w-fit flex justify-center items-center sm:justify-between sm:grid sm:grid-cols-3 sm:gap-y-2'>
          <Link to="/createImage" className="h-fit mr-5 font-medium bg-[rgb(109,84,210)] text-white px-4 py-2 rounded-md text-center sm:text-sm sm:px-2 sm:py-1 sm:mr-2">Create</Link>
          <Link to="/chatBot" className="h-fit mr-5 font-medium bg-[rgb(84,210,116)] text-white px-4 py-2 rounded-md text-center sm:text-sm sm:px-2 sm:py-1 sm:mr-2">Chat</Link>
          <Link to="/TSST" className="h-fit mr-5 font-medium bg-[rgb(226,188,37)] text-white px-4 py-2 rounded-md text-center sm:text-sm sm:px-2 sm:py-1 sm:mr-2">TSST</Link>
          <Link to="/summarizeURL" className="h-fit mr-5 font-medium bg-[rgb(37,97,226)] text-white px-4 py-2 rounded-md text-center sm:text-sm sm:px-2 sm:py-1 sm:mr-2">Summarize</Link>
          <Link to="/translator" className="h-fit mr-5 font-medium bg-[rgb(226,37,37)] text-white px-4 py-2 rounded-md text-center sm:text-sm sm:px-2 sm:py-1 sm:mr-2">Translate</Link>
          {
            (user) ? (
              <div className="flex">
                  <button onClick={ handleLogout } className="font-medium bg-[rgb(217,217,217)] text-black px-4 py-2 rounded-md mr-2"></button>
                  <img src={user?.result?.picture} alt={user?.result?.name} className=" rounded-full w-10"/> 
              </div>
            ) : (
              <Link to="auth" className="font-medium bg-[rgb(217,217,217)] text-black px-4 py-2 rounded-md sm:textext-center t-sm sm:px-2 sm:py-1 w-fit">Login</Link>
            )
          }
        </div>
    </header>
  )
}

export default Nav