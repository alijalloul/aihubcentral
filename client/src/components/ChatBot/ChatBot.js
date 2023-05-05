import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion';

import CodeEditor from '../CodeEditor/CodeEditor';
import LoadingDots from '../LoadingDots/LoadingDots';

const ChatBot = () => {
    const userInfo = useSelector(state => state?.user?.userInfo);
    const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";
    const [responsePending, setResponsePending] = useState(false);
    const [chat, setChat] = useState([]);
    const [chatResponses, setChatResponses]= useState([]);
    const [message, setMessage] = useState({
        role: "",
        content: ""
    });
    
    const handleChange = (e) => {
        setMessage({role:"user", content:e.target.value});
    }
    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            setChat((prevChat) => [...prevChat, message])
            setMessage({role:"", content:""});
        }        
    };

    useEffect(() => {
        const post = async() => {
            try {
                setResponsePending(true);

                const res = await fetch(`${BASE_URL}/api/openai/chatGPT`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ chat: chat }),
                });
                
                const data = await res.json();

                setChatResponses([...chatResponses, data.chatResponse]);
                

                setResponsePending(false);
            } catch (error) {
                console.log(error);

                setResponsePending(false);
            } finally{
                setResponsePending(false);
            }
        }

        if(chat.length > 0) {post();}

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[chat]);

  return (
    <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} 
        className='h-[calc(100vh-100px)] w-full flex bg-slate-50 sm:h-[calc(100vh-150px)]'>
        <div className='float-left bg-[#202123] w-[20vw] shadow-xl shadow-black relative z-1 sm:hidden'>
            {
                (userInfo) ? (
                    <div className='h-full px-5 flex justify-between items-center text-white'>
                        <div className='w-full h-[90%] flex items-center flex-col justify-between'>
                            <div className='w-full flex flex-col'>
                                <button className='w-full mb-1 bg-[#343541] py-3 rounded-lg hover:bg-[#454757] hover:bg-opacity-30 transition-all'>Chat 1</button>
                                <button className='w-full mb-1 py-3 rounded-lg hover:bg-[#454757] hover:bg-opacity-30 transition-all'>Chat 2</button>
                                <button className='w-full mb-1 py-3 rounded-lg hover:bg-[#454757] hover:bg-opacity-30 transition-all'>Chat 3</button>
                                <button className='w-full mb-1 py-3 rounded-lg hover:bg-[#454757] hover:bg-opacity-30 transition-all'>Chat 4</button>
                            </div>

                            <div className='w-full flex flex-col'>
                                <button className='w-full mb-3 text-black border-2 bg-green-300 border-green-500 py-3 rounded-lg hover:bg-green-400 hover:bg-opacity-30 transition-all'>Create New Chat</button>
                                <button className='w-full mb-3 text-black border-2 bg-red-300 border-red-500 py-3 rounded-lg hover:bg-red-400 hover:bg-opacity-30 transition-all'>Delete This Chat</button>
                                <button className='w-full mb-3 text-black border-2 bg-yellow-300 border-yellow-500 py-3 rounded-lg hover:bg-yellow-400 hover:bg-opacity-30 transition-all'>Delete All Chats</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='relative h-full px-5 flex justify-center'>
                        <div className='absolute top-0 mt-10 text-white text-lg font-bold bg-[#343541] py-5 px-3 shadow-black shadow-inner'>Please Login in order to save and create new chats</div>
                    </div>
                )
            }
        </div>

        <div className='w-full'>
            <div className='w-full h-[80%] flex flex-col overflow-y-scroll' style={{scrollbarWidth: "thin"}}>
                {
                    (chat.length > 0) && (
                        chat.map((message, index1) => (
                            <div className='w-full h-fit' key={index1} >
                                <div className='userMessages px-48 bg-white w-full py-8 border-y-2 border-gray-300 sm:px-10'>
                                    {message.content}
                                </div>

                                <div className='gptMessages font-semibold px-48 bg-gray-100 text-black w-full py-8 sm:px-10'>
                                    {
                                        (!chatResponses[index1]) ? (
                                            <div className=' text-3xl tracking-widest'>
                                                <LoadingDots />
                                            </div>
                                        ) : (
                                            chatResponses[index1].includes('```') ? (
                                                chatResponses[index1].split('```').map((e, index2) => (
                                                    (index2 % 2 === 0) ? (
                                                        {e}
                                                    ) : (
                                                        <CodeEditor code={e} language="javascript"  />   
                                                    )
                                                ))
                                            ) : (
                                                chatResponses[index1]
                                            )
                                        )
                                        //chatResponses[index1]
                                    }
                                </div>
                            </div>
                        ))
                    )   
                }
            </div>

            <div className='w-full h-[20%] py-3 flex justify-center items-center'>
                <input 
                    type="text" 
                    placeholder="Start Chatting" 
                    disabled={responsePending}
                    value={message.content} 
                    onChange={ handleChange } 
                    onKeyDown={ handleKeyDown } 
                    className='w-[60%] h-fit px-5 py-3 rounded-lg outline-none border-1 border-gray-300 text-black shadow-[rgba(0,0,0,0.05)_0_0_10px_10px] transition-all duration-300 sm:w-[80%]'></input>
            </div>
        </div>
    </motion.div>
  )
}

export default ChatBot