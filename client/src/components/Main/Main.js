import React, { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom";

const Main = () => {
    const excludedDivRef = useRef(null);
    const selectionRef = useRef(null);
    const aiFunctions = ['Chat', 'Create Image', 'Summarize', 'Translate', 'Text-to-Speech', 'Speech-to-Text'];
    const [selectedFunction, setSelectedFunction] = useState("Chat");
    const [selectionHeight, setSelectionHeight] = useState(0);
    const [expandFunctions, setExpandFunctions] = useState(false);

    const handleExpandFunctions = () => {
        if(expandFunctions){setExpandFunctions(false);}
        else{setExpandFunctions(true);setSelectionHeight(selectionRef.current.scrollHeight);}

        console.log(selectionRef.current.style.height);
    }

    const handleChooseFunction = (e) => {
        setSelectedFunction(e.target.value);
        setExpandFunctions(false);
    }

    useEffect(() => {
        // Event listener for clicks outside of the excluded div
        function handleClickOutside(event) {
            if (excludedDivRef.current && !excludedDivRef.current.contains(event.target)) {
                setExpandFunctions(false);
                console.log("cat")
            }
        }
    
        // Add event listener when component mounts
        if (expandFunctions) {
          window.addEventListener("click", handleClickOutside);
        }
    
        // Remove event listener when component unmounts
        return () => {
          window.removeEventListener("click", handleClickOutside);
        };
      }, [expandFunctions]);
  return (
    <div className='min-h-[calc(100vh-73px)] flex flex-col justify-center items-center mx-10'>
        <div className='w-full h-[calc(100vh-160px)] sm:h-[calc(100vh-200px)] px-48'>
            <div className='w-full h-[80%]'>

            </div>

            <div className='w-full h-12 flex justify-center items-center'>
                <div ref={excludedDivRef} className='relative w-[20%] h-full mr-5'>
                    <div className='absolute border-2  w-full flex flex-col justify-center items-center bottom-0 overflow-hidden rounded-xl'>
                        <div ref={selectionRef} style={{height: expandFunctions ? `${selectionHeight}px` : "0px"}} className={`w-full transition-height ease-in-out duration-200`}>
                                    {
                                aiFunctions.map((func, index) => (
                                    <button key={index} value={func} onClick={ handleChooseFunction } className='w-full px-5 py-2  bg-gray-50 mr-2 border-b-2'>{func}</button>
                                ))
                            }
                        </div>
                        <button onMouseUp={ handleExpandFunctions } className='h-full w-full px-5 py-2 bg-gray-100 rounded-b-lg'>{selectedFunction}</button>
                    </div>
                </div>

                <input className='w-[75%] h-full px-3 py-3 shadow-lg shadow-gray-400 border-2 bg-gray-50 rounded-lg focus:outline-none'></input>
            </div> 
        </div>
        <div className='min-h-[calc(100vh-73px)] flex flex-col justify-center items-center mx-10'>
            <div className='relative h-fit min-h-[70vh] border-b-2 border-black my-10 py-10 sm:flex-col sm:w-fit sm:h-fit sm:min-h-[45vh]'>
                <div className='w-[60%] sm:w-full sm:mb-16'>
                    <h1 className=' text-9xl sm:text-5xl'>Create Images From Prompts With DALLE-E</h1>
                </div>

                <div className='w-[25%] float-right flex justify-center items-center sm:w-full sm:absolute sm:bottom-0'>
                    <Link to="/createImage" className='absolute bottom-0 trasnform translate-y-[-50%] w-[25vw] h-[10vw] px-4 py-3 rounded-md font-bold text-gray-50 overflow-hidden flex justify-center items-center cursor-pointer sm:relative sm:w-full'>
                        <h1 className='relative z-[1] pointer-events-none'>Start Drawing!</h1>
                        <div style={{"background":"linear-gradient(45deg, rgba(0,56,234,1) 0%, rgba(255,0,151,1) 100%)"}}  className='absolute w-[110%] aspect-square top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[length:300%_300%] bg-left hover:bg-right hover:rotate-180 transition-all ease-in-out duration-500'></div>
                    </Link>
                </div>
            </div>

            <div className='relative h-fit min-h-[70vh] border-b-2 border-black my-10 py-10 sm:flex-col sm:w-fit sm:h-fit sm:min-h-[45vh]'>
                <div className='w-[60%] float-right sm:w-full sm:mb-5'>
                    <h1 className=' text-9xl sm:text-5xl'>Chat with CHAT-GPT 3.5 NOW</h1>
                </div>  
                
                <div className='w-[25vw]  flex  justify-center items-center sm:w-full sm:absolute sm:bottom-0'>
                    <Link to="/chatBot" className='absolute bottom-0 trasnform translate-y-[-50%]  w-[25vw] h-[10vw] px-4 py-3 rounded-md font-bold text-gray-50 overflow-hidden flex justify-center items-center cursor-pointer sm:relative sm:w-full'>
                        <h1 className='relative z-[1] pointer-events-none'>Start Chatting!</h1>
                        <div style={{"background":"linear-gradient(45deg, rgba(45,172,1,1) 0%, rgba(78,255,250,1) 100%)"}} className='absolute w-[110%] aspect-square top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[length:300%_300%] bg-left hover:bg-right hover:rotate-180 transition-all ease-in-out duration-500'></div>
                    </Link>
                </div>
            </div>

            <div className='relative h-fit min-h-[70vh] border-b-2 border-black my-10 py-10 sm:flex-col sm:w-fit sm:h-fit sm:min-h-[45vh]'>
                <div className='w-[60%] sm:w-full sm:mb-16'>
                    <h1 className=' text-9xl sm:text-5xl'>Summarize any Online Article OR Text</h1>
                </div>
                
                <div className='w-[25vw] float-right h-[10vw] flex justify-center items-center sm:w-full sm:absolute sm:bottom-0'>
                    <Link to="/summarizeURL" className='absolute bottom-0 trasnform translate-y-[-50%] w-[25vw] h-[10vw] px-4 py-3 rounded-md font-bold text-gray-50 overflow-hidden flex justify-center items-center cursor-pointer sm:relative sm:w-full'>
                        <h1 className='relative z-[1] pointer-events-none'>Start Summarizing!</h1>
                        <div style={{"background":"linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(241,255,0,1) 100%)"}} className='absolute w-[110%] aspect-square top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[length:300%_300%] bg-left hover:bg-right hover:rotate-180 transition-all ease-in-out duration-500'></div>
                    </Link>
                </div>
            </div>

            <div className='relative h-fit min-h-[70vh] border-b-2 border-black my-10 py-10 sm:flex-col sm:w-fit sm:h-fit sm:min-h-[45vh]'>            
                <div className='w-[60%] float-right sm:w-full sm:mb-5'>
                    <h1 className=' text-9xl sm:text-5xl'>Translate To And From Over 50+ Languages</h1>
                </div>

                <div className='w-[25vw]  flex  justify-center items-center sm:w-full sm:absolute sm:bottom-0'>
                    <Link to="/translator" className='absolute bottom-0 trasnform translate-y-[-50%] w-[25vw] h-[10vw] px-4 py-3 rounded-md font-bold text-gray-50 overflow-hidden flex justify-center items-center cursor-pointer sm:relative sm:w-full'>
                        <h1 className='relative z-[1] pointer-events-none'>Start Translating!</h1>
                        <div style={{"background":"linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(255,0,237,1) 100%)"}} className='absolute w-[110%] aspect-square top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[length:300%_300%] bg-left hover:bg-right hover:rotate-180 transition-all ease-in-out duration-500'></div>
                    </Link>
                </div>
            </div>

            <div className='relative h-fit min-h-[70vh] border-b-2 border-black my-10 py-10 sm:flex-col sm:w-fit sm:h-fit sm:min-h-[45vh]'>
                <div className='w-[60%] sm:w-full sm:mb-16'>
                    <h1 className=' text-9xl sm:text-5xl'>Transcribe Any Audio Using WHISPER AI</h1>
                </div>

                <div className='w-[25vw] float-right flex  justify-center items-center sm:w-full sm:absolute sm:bottom-0'>
                    <Link to="/TSST" className='absolute bottom-0 trasnform translate-y-[-50%]  w-[25vw] h-[10vw] px-4 py-3 rounded-md font-bold text-gray-50 overflow-hidden flex justify-center items-center cursor-pointer sm:relative sm:w-full'>
                        <h1 className='relative z-[1] pointer-events-none'>Start Transcribing!</h1>
                        <div style={{"background":"linear-gradient(45deg, rgba(255,252,0,1) 0%, rgba(255,175,0,1) 100%)"}} className='absolute w-[110%] aspect-square top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[length:300%_300%] bg-left hover:bg-right hover:rotate-180 transition-all ease-in-out duration-500'></div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Main