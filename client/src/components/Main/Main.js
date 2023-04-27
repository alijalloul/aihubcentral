import React from 'react'
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className='min-h-[calc(100vh-73px)] flex flex-col justify-center items-center mx-10'>
        <div className='relative h-fit min-h-[70vh] border-b-2 border-black my-10 py-10 sm:flex-col sm:w-fit sm:h-fit sm:min-h-[60vh]'>
            <div className='w-[60%] sm:w-full sm:mb-16'>
                <h1 className=' text-9xl sm:text-7xl'>Create Images From Prompts With DALLE-E</h1>
            </div>

            <div className='w-[25%] float-right flex justify-center items-center sm:w-full sm:absolute sm:bottom-0'>
                <Link to="/createImage" className='absolute bottom-0 trasnform translate-y-[-50%] w-[25vw] h-[10vw] px-4 py-3 rounded-md font-bold text-gray-50 overflow-hidden flex justify-center items-center cursor-pointer sm:relative sm:w-full'>
                    <h1 className='relative z-[1] pointer-events-none'>Start Drawing!</h1>
                    <div style={{"background":"linear-gradient(45deg, rgba(0,56,234,1) 0%, rgba(255,0,151,1) 100%)"}}  className='absolute w-[110%] aspect-square top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[length:300%_300%] bg-left hover:bg-right hover:rotate-180 transition-all ease-in-out duration-500'></div>
                </Link>
            </div>
        </div>

        <div className='relative h-fit min-h-[70vh] border-b-2 border-black my-10 py-10 sm:flex-col sm:w-fit sm:h-fit sm:min-h-[60vh]'>
            <div className='w-[60%] float-right sm:w-full sm:mb-5'>
                <h1 className=' text-9xl sm:text-7xl'>Chat with CHAT-GPT 3.5 NOW</h1>
            </div>  
            
            <div className='w-[25vw]  flex  justify-center items-center sm:w-full sm:absolute sm:bottom-0'>
                <Link to="/chatBot" className='absolute bottom-0 trasnform translate-y-[-50%]  w-[25vw] h-[10vw] px-4 py-3 rounded-md font-bold text-gray-50 overflow-hidden flex justify-center items-center cursor-pointer sm:relative sm:w-full'>
                    <h1 className='relative z-[1] pointer-events-none'>Start Chatting!</h1>
                    <div style={{"background":"linear-gradient(45deg, rgba(45,172,1,1) 0%, rgba(78,255,250,1) 100%)"}} className='absolute w-[110%] aspect-square top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[length:300%_300%] bg-left hover:bg-right hover:rotate-180 transition-all ease-in-out duration-500'></div>
                </Link>
            </div>
        </div>

        <div className='relative h-fit min-h-[70vh] border-b-2 border-black my-10 py-10 sm:flex-col sm:w-fit sm:h-fit sm:min-h-[60vh]'>
            <div className='w-[60%] sm:w-full sm:mb-16'>
                <h1 className=' text-9xl sm:text-7xl'>Summarize any Online Article OR Text</h1>
            </div>
            
            <div className='w-[25vw] float-right h-[10vw] flex justify-center items-center sm:w-full sm:absolute sm:bottom-0'>
                <Link to="/summarizeURL" className='absolute bottom-0 trasnform translate-y-[-50%] w-[25vw] h-[10vw] px-4 py-3 rounded-md font-bold text-gray-50 overflow-hidden flex justify-center items-center cursor-pointer sm:relative sm:w-full'>
                    <h1 className='relative z-[1] pointer-events-none'>Start Summarizing!</h1>
                    <div style={{"background":"linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(241,255,0,1) 100%)"}} className='absolute w-[110%] aspect-square top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[length:300%_300%] bg-left hover:bg-right hover:rotate-180 transition-all ease-in-out duration-500'></div>
                </Link>
            </div>
        </div>

        <div className='relative h-fit min-h-[70vh] border-b-2 border-black my-10 py-10 sm:flex-col sm:w-fit sm:h-fit sm:min-h-[60vh]'>            
            <div className='w-[60%] float-right sm:w-full sm:mb-5'>
                <h1 className=' text-9xl sm:text-7xl'>Translate To And From Over 50+ Languages</h1>
            </div>

            <div className='w-[25vw]  flex  justify-center items-center sm:w-full sm:absolute sm:bottom-0'>
                <Link to="/translator" className='absolute bottom-0 trasnform translate-y-[-50%] w-[25vw] h-[10vw] px-4 py-3 rounded-md font-bold text-gray-50 overflow-hidden flex justify-center items-center cursor-pointer sm:relative sm:w-full'>
                    <h1 className='relative z-[1] pointer-events-none'>Start Translating!</h1>
                    <div style={{"background":"linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(255,0,237,1) 100%)"}} className='absolute w-[110%] aspect-square top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[length:300%_300%] bg-left hover:bg-right hover:rotate-180 transition-all ease-in-out duration-500'></div>
                </Link>
            </div>
        </div>

        <div className='relative h-fit min-h-[70vh] border-b-2 border-black my-10 py-10 sm:flex-col sm:w-fit sm:h-fit sm:min-h-[60vh]'>
            <div className='w-[60%] sm:w-full sm:mb-16'>
                <h1 className=' text-9xl sm:text-7xl'>Transcribe Any Audio Using WHISPER AI</h1>
            </div>

            <div className='w-[25vw] float-right flex  justify-center items-center sm:w-full sm:absolute sm:bottom-0'>
                <Link to="/TSST" className='absolute bottom-0 trasnform translate-y-[-50%]  w-[25vw] h-[10vw] px-4 py-3 rounded-md font-bold text-gray-50 overflow-hidden flex justify-center items-center cursor-pointer sm:relative sm:w-full'>
                    <h1 className='relative z-[1] pointer-events-none'>Start Transcribing!</h1>
                    <div style={{"background":"linear-gradient(45deg, rgba(255,252,0,1) 0%, rgba(255,175,0,1) 100%)"}} className='absolute w-[110%] aspect-square top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[length:300%_300%] bg-left hover:bg-right hover:rotate-180 transition-all ease-in-out duration-500'></div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Main