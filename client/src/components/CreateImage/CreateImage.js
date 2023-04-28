import React, { useState } from 'react'
import { motion } from "framer-motion";

import Loader from "../Loader/Loader.js";
import {dalleSupriseMePrompts} from "../../constants/dallePrompts.js"
import emptyImage from "../../img/empty.jpg";

const CreateForm = () => {
  const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";
  const [dalleForm, setDalleForm] = useState({
    name: "",
    prompt: "",
    nbImages: 1,
    generatedImages: []
  });
  const[loading, setLoading] = useState(false);
  const [imagePos, setImagePos] = useState(0);
  const [resolution, setResolution] = useState(512);

  const handleSupriseMe = (e) => {
    e.preventDefault();
    setDalleForm({ ...dalleForm, prompt: dalleSupriseMePrompts[Math.floor(Math.random()*dalleSupriseMePrompts.length)]});
  }

  const handleGenerate = async () => {
    if(dalleForm.prompt){
      setLoading(true);

      try {
        const res = await fetch(`${BASE_URL}/api/openai/dalle`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: dalleForm.prompt, nbImages: dalleForm.nbImages, resolution: resolution }),
        });
        
        const data = await res.json();

        setDalleForm({ ...dalleForm, generatedImages: data.images});
        setImagePos(0);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  }

  const handleSubmit = async () => {
    if(dalleForm.generatedImages.length > 0){
      console.log(dalleForm);
      try {
        const res = await fetch(`${BASE_URL}/imageShowcase`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dalleForm),
        }); 

        const body = res.json();
        console.log(body);

      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleChange = (e) => {
    setDalleForm({ ...dalleForm, [e.target.name]: e.target.value });
  }
  return (
    <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className='h-fit min-h-[calc(100vh-73px)] w-full px-10 flex bg-slate-50 justify-between sm:flex-col'>
      <div className='pl-10 flex flex-col justify-center sm:pl-0'>
        <div className='h-fit'>
          <h1 className='relative z-[1] text-4xl font-bold text-white' style={{WebkitTextStroke: "2px black", textShadow: "4px 4px black"}}>Draw Your Imagination</h1>
          <p className='py-10 px-3 mb-10 bg-[rgb(109,84,210)] text-gray-100 transform skew-y-3'>Create an imaginative and stunning image from prompts using DALLE-E2 AI!</p>
          <form className="mb-3">
            <div>
              <p>Your Name</p>
              <input name="name" type="text" placeholder="John White" className="mb-5 p-2 w-full rounded-sm border-solid border-2 border-gray-600" onChange={ handleChange }></input>
            </div>

            <div className='w-fit flex rounded-md border-2 border-black'>
              <button onClick={(e) => {e.preventDefault(); setResolution(256) }} className={`px-5 py-3 ${(resolution === 256) && "bg-[rgb(109,84,210)] text-white"}`}>256</button> 
              <button onClick={(e) => {e.preventDefault(); setResolution(512) }} className={`px-5 py-3 border-x-2 border-black ${(resolution === 512) && "bg-[rgb(109,84,210)] text-white"}`}>512</button>
              <button onClick={(e) => {e.preventDefault(); setResolution(1024)}} className={`px-5 py-3 ${(resolution === 1024) && "bg-[rgb(109,84,210)] text-white"}`}>1024</button>
            </div>

            <div>
              <p>Number of Images</p>
              <input name="nbImages" type="text" value={dalleForm.nbImages} onChange={ handleChange } className="mb-2 p-2 w-[10%] text-center rounded-sm border-solid border-2 border-gray-600"/>
            </div>
            <div>
              <p>Prompt</p>
              <input name="prompt" type="text" placeholder="A pizza wearing glasses eating a pizza" value={dalleForm.prompt} onChange={ handleChange } className="mb-2 p-2 w-full rounded-sm border-solid border-2 border-gray-600"></input>
              <button onClick={ handleSupriseMe } className="px-2 py-3 bg-[rgb(109,84,210)] text-white rounded-md hover:bg-[rgb(77,56,158)] transition-all ease-in-out duration-200">Suprise Me</button>
            </div>
          </form>

          <button onClick={handleGenerate} className="mb-2 py-2 w-full bg-yellow-500 rounded-md text-white hover:bg-yellow-600 transition ease-in-out duration-200">Generate</button>
          <button onClick={handleSubmit} className=" py-2 w-full bg-green-600 rounded-md text-white hover:bg-green-700 transition ease-in-out duration-200">Submit</button>
        </div>
      </div>
      
      <div className='relative  w-[50vw] flex justify-center items-center sm:my-10 sm:w-full sm:h-[35vh]'>
        <button onClick={() => setImagePos((imagePos > 0) &&imagePos - 1)} className='h-[35vw] w-10 rounded-l-lg flex items-center justify-center bg-gray-400 hover:bg-gray-300 active:bg-gray-200 transition-all ease-in-out duration-200 sm:h-full'></button>
        
        <div className=' sm:h-[35vh] sm:aspect-square'>
          <div className='relative h-[35vw] aspect-square overflow-hidden sm:h-full'>
            {
              loading && (
                <Loader stylingT="absolute aspect-square absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
              )
            }
            <div className={`relative flex w-max h-full transition-all ease-in-out`} style={{left: `${(-1)*imagePos*100}%`}}>
              {
                (dalleForm?.generatedImages?.length > 0) ? (
                  dalleForm?.generatedImages?.map((generatedImage, index) => (
                    <img key={index} src={generatedImage} alt="N/A" className={`h-full aspect-square object-contain ${loading && ("filter: opacity-20")}`}></img>
                  ))
                ) : (
                  <img src={emptyImage} alt="N/A" className={`h-full aspect-square object-contain ${loading && ("filter: opacity-20")}`}></img>
                )
              }
            </div>
          </div>  
        </div>

        <button onClick={ () => {(imagePos < (dalleForm?.generatedImages?.length - 1)) && setImagePos(imagePos + 1); console.log(imagePos,":",`left-[-${imagePos*100}%]`)}} className='h-[35vw] w-10 rounded-r-lg flex items-center justify-center bg-gray-400 hover:bg-gray-300 active:bg-gray-200 transition-all ease-in-out duration-200 sm:h-full'></button>
      </div>
    </motion.div>
  )
}

export default CreateForm