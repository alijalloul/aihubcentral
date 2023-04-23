import React, { useEffect, useState } from 'react'

const SummarizeURL = () => {
  const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";
  const MAX_WORDS = 4000;

  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [words, setWords] = useState(0);
  const [loading, setLoading] = useState(false);

  const [loadingDots, setLoadingDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots(prevDots => {
        // Update the number of dots in the loading animation
        return prevDots === '...' ? '' : prevDots + '.';
      });
    }, 500); // Change the interval time to control the animation speed

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleChange = (e) => {
    setUrl(e.target.value);
    setWords(e.target.value.split(" ").length - 1);
  }

  const handleSummarize = async (e) => {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/api/openai/summarize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({url: url}),
      });
      
      const data = await res.json();

      setSummary(data);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-full h-[calc(100vh-73px)] flex justify-center'>
      <div className='w-[40%] h-full mt-0 flex flex-col items-center sm:w-[80%]'>
        <div className=''>
          <div className=' text-6xl mb-5 leading-[5rem]'><span className='bg-[rgb(255,132,0)] bg-[linear-gradient(45deg,rgba(255,132,0,1)_0%,rgba(255,215,0,1)_100%)] bg-clip-text text-transparent'>Summarize</span> any <span className='bg-[rgb(16,120,252)] bg-[linear-gradient(45deg,rgba(16,120,252,1)_0%,rgba(149,0,255,1)_100%)] bg-clip-text text-transparent'>Article</span> from a URL using <span className='text-[#1abb98]'>CHAT-GPT</span></div>
          <div className='flex'>
            <div className=' relative w-[80%] mr-5 py-2 px-2 rounded-md border-2 border-gray-300 items-center'>
              <textarea 
                  rows="1"
                  placeholder='e.g. https://en.wikipedia.org/wiki/Deer'
                  onChange={ (e) => {handleChange(e); (e.target.rows = 1); (e.target.rows = (e.target.scrollHeight)/24 ); (console.log(e.target.scrollHeight))} }
                  className='w-[80%] h-auto ml-5 mb-5 overflow-hidden whitespace-pre-wrap border-none outline-none resize-none '></textarea>
                <div className='absolute bottom-0 right-0 mr-2 mb-2 opacity-50'>{words}/{MAX_WORDS}</div>
            </div>
            <div onClick={ handleSummarize } className=' relative w-fit h-full px-4 py-3 rounded-md font-bold text-gray-50 overflow-hidden flex justify-center items-center cursor-pointer'>
              <h1 className='relative z-[1] pointer-events-none'>Summarize</h1>
              <div className='absolute w-[110%] aspect-square top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[rgb(234,121,0)] bg-[linear-gradient(45deg,rgba(234,121,0,1)_0%,rgba(236,199,0,1)_34%,rgba(201,0,255,1)_66%,rgba(0,87,255,1)_100%)] bg-[length:300%_300%] bg-left  hover:bg-right hover:rotate-180 transition-all ease-in-out duration-500'></div>
            </div>
          </div>
        </div>

        <div className='w-full h-fit h-max-[40%] mt-3'>
          <div className='w-full h-full px-5 py-2 flex flex-col border border-3 border-black rounded-md overflow-y-scroll'>
            <div className='text-xl mb-2'>Summary: </div>
            {
              loading ? (
                <div>
                  <span>Summarizing Article</span>
                  {loadingDots}
                </div>
              ) : (
                <div className='ml-4'>
                  { 
                    <div>{summary}</div>
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummarizeURL