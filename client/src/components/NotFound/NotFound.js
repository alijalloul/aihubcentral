import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    const [isHovered, setIsHovered] = useState(false)
  return (
    <div className='h-[calc(100vh-73px)] sm:h-[calc(100vh-120px)] w-full flex justify-center items-center bg-black text-white'>
        <div className="relative w-[60%] flex flex-col justify-center items-center text-center sm:w-[90%]">
            <h3 className={`text-8xl pb-5 mb-5 border-b-2 border-white ${isHovered ? "opacity-0" : "opacity-1"} transition-all ease-in-out duration-500 sm:text-5xl`}>There Is Nothing To Be Seen Here</h3>
            <h3 className={`text-7xl mb-5 ${isHovered ? "opacity-0" : "opacity-1"} transition-all ease-in-out duration-500 sm:text-4xl`}>BEGONE!!!</h3>
            <Link to="/" onMouseOver={() => {setIsHovered(true)}} onMouseOut={() => {setIsHovered(false)}} className={`absolute flex justify-center items-center bottom-0 translate-y-[100%] px-20 py-5 border-4 border-white ${isHovered ? "rounded-[900px] w-[400px] h-[400px] translate-y-[10%] sm:w-[300px] sm:h-[300px]" : " rounded-[0px] w-[250px] h-[70px]"} active:bg-white active:text-black active:border-black transition-all ease-in-out duration-[1s]`}>Go Home</Link>
        </div>
    </div>
  )
}

export default NotFound