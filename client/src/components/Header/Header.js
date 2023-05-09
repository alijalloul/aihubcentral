import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";

import { logout } from "../../redux/User.js"

const Header = () => {
    const dispatch = useDispatch();
    const Headerigate = useNavigate();
    const location = useLocation();

    const[subdomain, setSubdomain] = useState("");
    const[leftPosition, setLeftPosition] = useState(0)
    const[topPosition, setTopPosition] = useState(0)
    const [buttonWidth, setButtonWidth] = useState(0);
    const[showWarning, setShowWarning] = useState(false);
    const[showNav, setShowNav] = useState(false);
    const [ user, setUser ] = useState((typeof window !== 'undefined') && JSON.parse(localStorage.getItem('profile')));

    const homeBtnRef = useRef(null);
    const createImageBtnRef = useRef(null);
    const chatBtnRef = useRef(null);
    const tsstBtnRef = useRef(null);
    const summarizeBtnRef = useRef(null);
    const translateBtnRef = useRef(null);
    const loginBtnRef = useRef(null);
    const contextBtnRef = useRef(null);

    const excludedDivRef = useRef(null);
    useEffect(() => {
        const token = user?.token;
        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout(Headerigate, dispatch);
        }

        if (typeof window !== 'undefined') {
          setUser(JSON.parse(localStorage.getItem("profile")))
        };

        const subDomain = window.location.pathname.substring(1);
        if(subDomain === ""){
          setLeftPosition(0); 
          setTopPosition(48*0);
          setButtonWidth(homeBtnRef.current.getBoundingClientRect().width);
        }else if(subDomain === "createImage"){
          setLeftPosition(createImageBtnRef.current.offsetLeft); 
          setTopPosition(48*1)
          setButtonWidth(createImageBtnRef.current.getBoundingClientRect().width);
        }else if(subDomain === "chatBot"){
          setLeftPosition(chatBtnRef.current.offsetLeft); 
          setTopPosition(48*2)
          setButtonWidth(chatBtnRef.current.getBoundingClientRect().width);
        }else if(subDomain === "TSST"){
          setLeftPosition(tsstBtnRef.current.offsetLeft); 
          setTopPosition(48*3)
          setButtonWidth(tsstBtnRef.current.getBoundingClientRect().width);
        }else if(subDomain === "summarizeURL"){
          setLeftPosition(summarizeBtnRef.current.offsetLeft); 
          setTopPosition(48*4)
          setButtonWidth(summarizeBtnRef.current.getBoundingClientRect().width);
        }else if(subDomain === "translator"){
          setLeftPosition(translateBtnRef.current.offsetLeft); 
          setTopPosition(48*5)
          setButtonWidth(translateBtnRef.current.getBoundingClientRect().width);
        }else if(subDomain === "auth"){
          setLeftPosition(loginBtnRef.current.offsetLeft);
          setTopPosition(48*6) 
          setButtonWidth(loginBtnRef.current.getBoundingClientRect().width);
        }else if(subDomain === "context"){
          setLeftPosition(contextBtnRef.current.offsetLeft);
          setTopPosition(48*7) 
          setButtonWidth(contextBtnRef.current.getBoundingClientRect().width);
        }

        setSubdomain(subDomain);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location]);

    useEffect(() => {
      function handleResize() {
        const subDomain = window.location.pathname.substring(1);
        if(subDomain === ""){
          setLeftPosition(0); 
          setTopPosition(48*0);
          setButtonWidth(homeBtnRef.current.getBoundingClientRect().width);
        }else if(subDomain === "createImage"){
          setLeftPosition(createImageBtnRef.current.offsetLeft); 
          setTopPosition(48*1)
          setButtonWidth(createImageBtnRef.current.getBoundingClientRect().width);
        }else if(subDomain === "chatBot"){
          setLeftPosition(chatBtnRef.current.offsetLeft); 
          setTopPosition(48*2)
          setButtonWidth(chatBtnRef.current.getBoundingClientRect().width);
        }else if(subDomain === "TSST"){
          setLeftPosition(tsstBtnRef.current.offsetLeft); 
          setTopPosition(48*3)
          setButtonWidth(tsstBtnRef.current.getBoundingClientRect().width);
        }else if(subDomain === "summarizeURL"){
          setLeftPosition(summarizeBtnRef.current.offsetLeft); 
          setTopPosition(48*4)
          setButtonWidth(summarizeBtnRef.current.getBoundingClientRect().width);
        }else if(subDomain === "translator"){
          setLeftPosition(translateBtnRef.current.offsetLeft); 
          setTopPosition(48*5)
          setButtonWidth(translateBtnRef.current.getBoundingClientRect().width);
        }else if(subDomain === "auth"){
          setLeftPosition(loginBtnRef.current.offsetLeft);
          setTopPosition(48*6) 
          setButtonWidth(loginBtnRef.current.getBoundingClientRect().width);
        }else if(subDomain === "context"){
          setLeftPosition(contextBtnRef.current.offsetLeft);
          setTopPosition(48*7) 
          setButtonWidth(contextBtnRef.current.getBoundingClientRect().width);
        }
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        logout(Headerigate, dispatch);
        setUser(null);
    }

    const handleLocationChange = () => {};
    const handleNavSwitchState =() => {
      if(showNav){setShowNav(false)}
      else{setShowNav(true)}
    }

    useEffect(() => {
      // Event listener for clicks outside of the excluded div
      function handleClickOutside(event) {
          if (excludedDivRef.current && !excludedDivRef.current.contains(event.target)) {
              setShowNav(false);
              console.log("cat");
          }
      }
  
      // Add event listener when component mounts
      if (showNav) {
        window.addEventListener("click", handleClickOutside);
      }
  
      // Remove event listener when component unmounts
      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    }, [showNav]);
  return (
    <header className='w-full h-fit min-h-[73px] flex justify-center items-center flex-col bg-white border-b border-b-[#e6ebf4] md:min-h-[100px] md:px-5'>
        <div className='w-full h-fit px-4 py-4 flex justify-between items-center md:px-2'>
          <div className='flex justify-center items-center'>
            <h1 className=' font-bold text-3xl mr-5 md:w-min'>AI Hub Central</h1>
            <Link to="/" onClick={() => {setLeftPosition(0); setTopPosition(0);setButtonWidth(homeBtnRef.current.getBoundingClientRect().width); }}> 
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
          </div>

          <div className='relative w-fit flex justify-center items-center rounded-lg md:hidden'>
            <div style={{left: leftPosition, width: buttonWidth}} className={`absolute bg-black h-full rounded-lg transition-all ease-in-out duration-500`}></div>
            <Link to="/"              ref={homeBtnRef}        onClick={(e) => {setLeftPosition(e.target.offsetLeft); }} className={`${(subdomain === "")              && ("text-white")} px-5 py-3 relative z-10 h-fit mr-5 rounded-lg font-medium text-center transition-all ease-in-out`}>Home</Link>
            <Link to="/chatBot"       ref={chatBtnRef}        onClick={(e) => {setLeftPosition(e.target.offsetLeft); }} className={`${(subdomain === "chatBot")       && ("text-white")} px-5 py-3 relative z-10 h-fit mr-5 rounded-lg font-medium text-center transition-all ease-in-out`}>Chat</Link>
            <Link to="/createImage"   ref={createImageBtnRef} onClick={(e) => {setLeftPosition(e.target.offsetLeft); }} className={`${(subdomain === "createImage")   && ("text-white")} px-5 py-3 relative z-10 h-fit mr-5 rounded-lg font-medium text-center transition-all ease-in-out`}>Create Image</Link>
            <Link to="/summarizeURL"  ref={summarizeBtnRef}   onClick={(e) => {setLeftPosition(e.target.offsetLeft); }} className={`${(subdomain === "summarizeURL")  && ("text-white")} px-5 py-3 relative z-10 h-fit mr-5 rounded-lg font-medium text-center transition-all ease-in-out`}>Summarize</Link>
            <Link to="/translator"    ref={translateBtnRef}   onClick={(e) => {setLeftPosition(e.target.offsetLeft); }} className={`${(subdomain === "translator")    && ("text-white")} px-5 py-3 relative z-10 h-fit mr-5 rounded-lg font-medium text-center transition-all ease-in-out`}>Translate</Link>
            <Link to="/TSST"          ref={tsstBtnRef}        onClick={(e) => {setLeftPosition(e.target.offsetLeft); }} className={`${(subdomain === "TSST")          && ("text-white")} px-5 py-3 relative z-10 h-fit mr-5 rounded-lg font-medium text-center transition-all ease-in-out`}>TSST</Link>
            {
              // (user) ? (
              //   <div className="flex">
              //       <button onClick={ handleLogout } className="font-medium bg-[rgb(217,217,217)] text-black px-4 py-2 rounded-md mr-2"></button>
              //       <img src={user?.result?.picture} alt={user?.result?.name} className=" rounded-full w-10"/> 
              //   </div>
              // ) : (
              //   <Link to="/auth" ref={loginBtnRef} onClick={(e) => {setLeftPosition(e.target.offsetLeft); setButtonWidth(e.target.getBoundingClientRect().width); }} className={`${(subdomain === "auth")    && ("text-white")} px-5 py-3 relative z-10 h-fit mr-5 rounded-lg font-medium text-center transition-all ease-in-out`}>Login</Link>
              // )
            }
            <Link to="/context" ref={contextBtnRef} onClick={(e) => {setLeftPosition(e.target.offsetLeft); }} className={`${(subdomain === "context") && ("text-white")} px-5 py-3 relative z-10 h-fit mr-5 rounded-lg font-medium text-center transition-all ease-in-out`}>Ask From Context</Link>
          </div>

          <div ref={excludedDivRef}  className='hidden md:visible md:block'>
            <button onMouseUp={ handleNavSwitchState } className='relative z-20 flex flex-col justify-evenly items-center aspect-square w-14 border-4 border-black'>
                <div className={` w-[80%] h-1 bg-black rounded-lg transition-all ease-in-out duration-200 ${showNav ? ("transform rotate-[45deg] translate-x-[0] translate-y-[13px]") : ("transform translate-x-0 opacity-1")}`}></div>              
                <div className={` w-[80%] h-1 bg-black rounded-lg transition-all ease-in-out duration-200 ${showNav ? ("transform translate-x-[-50%] opacity-0") : ("transform translate-x-0 opacity-1")}`}></div>              
                <div className={` w-[80%] h-1 bg-black rounded-lg transition-all ease-in-out duration-200 ${showNav ? ("transform rotate-[-45deg] translate-x-[0] translate-y-[-13px]") : ("transform translate-x-0 opacity-1")}`}></div>              
              </button>

            <div className={`${showNav ? "w-[50%]" : " w-0"} fixed flex justify-center items-center overflow-hidden item z-10 top-[50vh] transform translate-y-[-50%] h-[100vh] right-0 bg-slate-300 transition-all ease-in-out duration-200`}>
              <div className='relative flex justify-center items-center w-full h-max'>
                <div style={{top: topPosition, width: "100%"}} className={`absolute bg-black h-[14%] transition-all ease-in-out duration-500`}></div>
                  <div className='w-full flex flex-col justify-center items-center '>
                    <Link to="/"               onClick={(e) => {setTopPosition(e.target.offsetTop); }} className={`${(subdomain === "")              && ("text-white")} ${showNav ? "left-0" : "left-[100px]"} w-full py-3 relative z-10 h-fit rounded-lg font-medium text-center transition-all ease-in-out duration-[100ms]`}>Home</Link>
                    <Link to="/chatBot"        onClick={(e) => {setTopPosition(e.target.offsetTop); }} className={`${(subdomain === "chatBot")       && ("text-white")} ${showNav ? "left-0" : "left-[300px]"} w-full py-3 relative z-10 h-fit rounded-lg font-medium text-center transition-all ease-in-out duration-[300ms]`}>Chat</Link>
                    <Link to="/createImage"    onClick={(e) => {setTopPosition(e.target.offsetTop); }} className={`${(subdomain === "createImage")   && ("text-white")} ${showNav ? "left-0" : "left-[200px]"} w-full py-3 relative z-10 h-fit rounded-lg font-medium text-center transition-all ease-in-out duration-[200ms]`}>Create Image</Link>
                    <Link to="/summarizeURL"   onClick={(e) => {setTopPosition(e.target.offsetTop); }} className={`${(subdomain === "summarizeURL")  && ("text-white")} ${showNav ? "left-0" : "left-[500px]"} w-full py-3 relative z-10 h-fit rounded-lg font-medium text-center transition-all ease-in-out duration-[500ms]`}>Summarize</Link>
                    <Link to="/translator"     onClick={(e) => {setTopPosition(e.target.offsetTop); }} className={`${(subdomain === "translator")    && ("text-white")} ${showNav ? "left-0" : "left-[600px]"} w-full py-3 relative z-10 h-fit rounded-lg font-medium text-center transition-all ease-in-out duration-[600ms]`}>Translate</Link>                   
                    <Link to="/TSST"           onClick={(e) => {setTopPosition(e.target.offsetTop); }} className={`${(subdomain === "TSST")          && ("text-white")} ${showNav ? "left-0" : "left-[400px]"} w-full py-3 relative z-10 h-fit rounded-lg font-medium text-center transition-all ease-in-out duration-[400ms]`}>TSST</Link>
                    {
                      (user) ? (
                        <div className="flex">
                            <button onClick={ handleLogout } className="font-medium bg-[rgb(217,217,217)] text-black px-4 py-2 rounded-md mr-2"></button>
                            <img src={user?.result?.picture} alt={user?.result?.name} className=" rounded-full w-10"/> 
                        </div>
                      ) : (
                        <Link to="/auth" onClick={(e) => {setTopPosition(e.target.offsetTop); }} className={`${(subdomain === "auth") && ("text-white")} ${showNav ? "left-0" : "left-[400px]"} px-5 py-3 relative z-10 h-fit mr-5 rounded-lg font-medium text-center transition-all ease-in-out duration-[700ms]`}>Login</Link>
                      )
                    }
                  </div>
                </div>
            </div>
          </div>
        </div>

        <div className='relative w-ful px-40 bg-yellow-100 md:px-10 md:py-2' style={{display: showWarning ? "static" : "none"}}>
            <button onClick={ () => setShowWarning(false) } className='absolute right-0 mr-5'>x</button>
            <p className=' opacity-75'>Hello and welcome to aihubcentral.org. Thanks for taking interest in this project. This website utilizes the free tier of the openAI API and the Render server deployment, therefore you might expreience some prolonged loading screens because of the limited API requests available as of now. Please try again at a later time. Thanks.</p>
        </div>
    </header>
  )
}

export default Header