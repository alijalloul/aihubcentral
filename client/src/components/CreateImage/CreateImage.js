import React, { useState } from 'react'

import Loader from "../Loader/Loader.js";
import {dalleSupriseMePrompts} from "../../constants/dallePrompts.js"
import emptyImage from "../../img/empty.jpg";

const CreateForm = () => {
  const BASE_URL = process.env.SERVER_URL || "http://localhost:5000";
  const [dalleForm, setDalleForm] = useState({
    name: "",
    prompt: "",
    generatedImage: ""
  });
  const[loading, setLoading] = useState(false);

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
          body: JSON.stringify({ prompt: dalleForm.prompt }),
        });
        
        const data = await res.json();

        setDalleForm({ ...dalleForm, generatedImage: `data:image/jpeg;base64,${data.image}`});
      } catch (error) {
        alert(error);
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
    <div className='h-[calc(100vh-73px)] w-full px-10 flex min-h-fit bg-slate-50 justify-between'>
      <div className='pl-10 h-full flex flex-col justify-center'>
        <div className='h-fit'>
          <h1 className='relative z-[1] text-4xl font-bold text-white' style={{WebkitTextStroke: "2px black", textShadow: "4px 4px black"}}>Draw Your Imagination</h1>
          <p className='py-10 px-3 mb-10 bg-[rgb(109,84,210)] text-gray-100 transform skew-y-3'>Create an imaginative and stunning image from prompts using DALLE-E2 AI!</p>
          <form className="mb-3">
            <div>
              <p>Your Name</p>
              <input name="name" type="text" placeholder="John White" className="mb-5 p-2 w-full b rounded-sm border-solid border-2 border-gray-600"></input>
            </div>

            <div>
              <p>Prompt</p>
              <input name="prompt" type="text" placeholder="A pizza wearing glasses eating a pizza" value={dalleForm.prompt} onChange={ handleChange } className="mb-2 p-2 w-full b rounded-sm border-solid border-2 border-gray-600"></input>
              <button onClick={ handleSupriseMe } className="px-2 py-3 bg-[rgb(109,84,210)] text-white rounded-md hover:bg-[rgb(77,56,158)] transition-all ease-in-out duration-200">Suprise Me</button>
            </div>
          </form>

          <button onClick={handleGenerate} className=" py-2 w-full bg-yellow-500 rounded-md text-white">Generate</button>
        </div>
      </div>
      
      <div className='w-[50vw] flex justify-center items-center'>
        <div className='relative w-[35vw] aspect-square rounded-3xl overflow-hidden'>
          {
            loading && (
              <Loader stylingT="absolute aspect-square absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
            )
          }
          <img src={dalleForm.generatedImage ? dalleForm.generatedImage : emptyImage} alt="N/A" className={`w-full h-full object-contain ${loading && ("filter: opacity-20")}`}></img>
        </div>
      </div>
    </div>
  )
}

export default CreateForm