import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    const [isHovered, setIsHovered] = useState(false)
  return (
    <div className='h-[calc(100vh-73px)] md:h-[calc(100vh-120px)] w-full flex justify-center items-center bg-black text-white'>
        <div className="relative w-[60%] flex flex-col justify-center items-center text-center md:w-[90%]">
            <h3 className={`text-8xl pb-5 mb-5 border-b-2 border-white ${isHovered ? "opacity-0" : "opacity-1"} transition-all ease-in-out duration-500 md:text-5xl`}>There Is Nothing To Be Seen Here</h3>
            <h3 className={`text-7xl mb-5 ${isHovered ? "opacity-0" : "opacity-1"} transition-all ease-in-out duration-500 md:text-4xl`}>BEGONE!!!</h3>
            <Link to="/" onMouseOver={() => {setIsHovered(true)}} onMouseOut={() => {setIsHovered(false)}} className={`absolute flex justify-center items-center bottom-0 px-20 py-5 border-4 border-white ${isHovered ? "rounded-[900px] w-[400px] h-[400px] translate-y-[10%] md:w-[300px] md:h-[300px]" : "translate-y-[100%] rounded-[0px] w-[250px] h-[70px]"} active:bg-white active:text-black active:border-black transition-all ease-in-out duration-[1s]`}>Go Home</Link>
        </div>
    </div>
  )
}

export default NotFound