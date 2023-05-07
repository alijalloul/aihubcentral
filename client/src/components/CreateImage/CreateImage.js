import React, { useState } from 'react'
import { LazyMotion, domAnimation, m } from "framer-motion";

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
  const[errors, setErrors] = useState({
    promptEmpty: false,
    nbImagesEmpty: false,
  });

  const handleSupriseMe = (e) => {
    e.preventDefault();
    setDalleForm({ ...dalleForm, prompt: dalleSupriseMePrompts[Math.floor(Math.random()*dalleSupriseMePrompts.length)]});
  }

  const handleGenerate = async () => {
    let isError=false;
    if(dalleForm.nbImages < 1 || dalleForm.nbImages > 5){
      setErrors({...errors, nbImagesEmpty: true});
      isError = true;
    } 
    if(!dalleForm.prompt){
      setErrors({...errors, promptEmpty: true});
      isError = true;
    }

    console.log(errors)
    if(!isError){
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

  const handleChange = (e) => {
    setDalleForm({ ...dalleForm, [e.target.name]: e.target.value });
  }
  return (
    <LazyMotion features={domAnimation}> 
      <m.div  
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className='h-fit min-h-[calc(100vh-73px)] w-full px-10 flex bg-slate-50 justify-between sm:flex-col'>
        <div className='pl-10 flex flex-col justify-center sm:pl-0'>
          <div className='h-fit w-[80%] sm:w-full'>
            <p className='w-full my-2 text-black text-6xl mb-5 leading-[4rem] sm:text-4xl'>
              <span className="inline-block" style={{"background":"linear-gradient(45deg, rgba(255,0,224,1) 0%, rgba(0,1,255,1) 100%)","backgroundClip":"text","color":"transparent", "font-weight": "bold"}}>Create&nbsp;</span> 
              <span className='inline-block'>Stunning&nbsp;</span> 
              <span className='inline-block'>And&nbsp;</span> 
              <span className='inline-block'>Creative&nbsp;</span>
              <span className='inline-block' style={{"background":"linear-gradient(45deg, rgba(0,255,248,1) 0%, rgba(255,0,202,1) 100%)","backgroundClip":"text","color":"transparent", "font-weight": "bold"}}>Images&nbsp;</span> 
              <span className='inline-block'>From &nbsp;</span>
              <span className='inline-block'>Prompts &nbsp;</span>
              <span className='inline-block'>Using &nbsp;</span>
              <span className='inline-block' style={{"background":"linear-gradient(45deg, rgba(239,0,255,1) 0%, rgba(255,0,0,1) 100%)","backgroundClip":"text","color":"transparent", "font-weight": "bold"}}>DALLE-2 AI!&nbsp;</span>
            </p>
            <form className="mb-3">
              <div>
                <p>Your Name</p>
                <input name="name" type="text" placeholder="John White" className=" outline-none mb-5 p-2 w-full rounded-sm border-solid border-2 border-gray-600" onChange={ handleChange }></input>
              </div>

              <div className='mb-3'>
                <p>Resolution</p>
                <div className='w-fit flex rounded-md border-2 border-black'>
                  <button onClick={(e) => {e.preventDefault(); setResolution(256) }} className={`px-5 py-3 ${(resolution === 256) && "bg-black text-white"} transition-all ease-in-out`}>256x256</button> 
                  <button onClick={(e) => {e.preventDefault(); setResolution(512) }} className={`px-5 py-3 border-x-2 border-black ${(resolution === 512) && "bg-black text-white"} transition-all ease-in-out`}>512x512</button>
                  <button onClick={(e) => {e.preventDefault(); setResolution(1024)}} className={`px-5 py-3 ${(resolution === 1024) && "bg-black text-white"} transition-all ease-in-out`}>1024x1024</button>
                </div>
              </div>

              <div>
                <p style={{color: errors.nbImagesEmpty && "red"}}>Number of Images</p>
                <input name="nbImages" type="text" value={dalleForm.nbImages} onChange={ (e) => {handleChange(e); setErrors({ ...errors, nbImagesEmpty: false})}} style={{borderColor: `${ errors.nbImagesEmpty ? "red" : "black" }`}} className={`outline-none ${errors.nbImagesEmpty ? "mb-0" : "mb-2"} p-2 w-[10%] text-center rounded-sm border-solid border-2 border-gray-600`}/>
                <p className={`${!errors.nbImagesEmpty && "hidden"} text-red-600 italic mb-2`}>The number of images should be between 1 and 5 </p>
              </div>
              <div>
                <p style={{color: errors.promptEmpty && "red"}}>Prompt</p>
                <input name="prompt" type="text" placeholder="A pizza wearing glasses eating a pizza" value={dalleForm.prompt} onChange={ (e) => {handleChange(e); setErrors({ ...errors, promptEmpty: false})}} style={{borderColor: `${ errors.promptEmpty ? "red" : "black" }`}} className={`outline-none ${errors.promptEmpty ? "mb-0" : "mb-2"} p-2 w-full rounded-sm border-solid border-2 border-gray-600`}></input>
                <p className={`${!errors.promptEmpty && "hidden"} text-red-600 italic mb-2`}>Please fill the prompt</p>
                <button onClick={ handleSupriseMe } className="px-2 py-3 bg-[rgb(109,84,210)] text-white rounded-md hover:bg-[rgb(77,56,158)] transition-all ease-in-out duration-200">Suprise Me</button>
              </div>
            </form>

            <button onClick={handleGenerate} className="mb-2 py-2 w-full bg-black rounded-md text-white hover:bg-yellow-600 transition ease-in-out duration-200">Generate</button>
          </div>
        </div>
        
        <div className='relative  w-[50vw] flex justify-center items-center sm:my-10 sm:w-full sm:h-[35vh]'>
          <button onClick={() => setImagePos((imagePos > 0) &&imagePos - 1)} className='h-[35vw] w-10 rounded-l-lg flex items-center justify-center bg-gray-500 hover:bg-gray-400 active:bg-gray-300 transition-all ease-in-out duration-200 sm:h-full text-white'>&lt;</button>
          
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

          <button onClick={ () => {(imagePos < (dalleForm?.generatedImages?.length - 1)) && setImagePos(imagePos + 1); console.log(imagePos,":",`left-[-${imagePos*100}%]`)}} className='h-[35vw] w-10 rounded-r-lg flex items-center justify-center bg-gray-500 hover:bg-gray-400 active:bg-gray-300 transition-all ease-in-out duration-200 sm:h-full text-white'>&gt;</button>
        </div>
      </m.div >
    </LazyMotion>
  )
}

export default CreateForm