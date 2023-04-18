import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DotDotDot from './DotDotDot/DotDotDot';

const ChatBot = () => {
    const userInfo = useSelector(state => state?.user?.userInfo);
    console.log(userInfo);
    const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";
    const [responsePending, setResponsePending] = useState(false);

    const [message, setMessage] = useState({
        role: "",
        content: ""
    });
    const [chat, setChat] = useState([]);
    const [chatResponses, setChatResponses]= useState([]);
    
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
    },[chat]);

  return (
    <div className='h-[calc(100vh-73px)] w-full min-h-fit flex'>
        <div className='float-left h-full bg-[#2c2d37] w-[20vw] shadow-xl shadow-[#10a37f] relative z-1'>
            {
                (userInfo) ? (
                    <div className='h-full px-5 flex justify-between items-center text-white'>
                        <div className='w-full h-[90%] flex items-center flex-col justify-between  overflow-scroll'>
                            <div className='w-full flex flex-col'>
                                <button className='w-full mb-3 border-2 border-[#22232b] py-3 rounded-lg hover:bg-[#454757] hover:bg-opacity-30 transition-all'>Chat 1</button>
                                <button className='w-full mb-3 border-2 border-[#22232b] py-3 rounded-lg hover:bg-[#454757] hover:bg-opacity-30 transition-all'>Chat 2</button>
                                <button className='w-full mb-3 border-2 border-[#22232b] py-3 rounded-lg hover:bg-[#454757] hover:bg-opacity-30 transition-all'>Chat 3</button>
                                <button className='w-full mb-3 border-2 border-[#22232b] py-3 rounded-lg hover:bg-[#454757] hover:bg-opacity-30 transition-all'>Chat 4</button>
                            </div>

                            <div className='w-full flex flex-col'>
                                <button className='w-full mb-3 border-2 border-green-500 py-3 rounded-lg hover:bg-green-200 hover:bg-opacity-30 transition-all'>Create New Chat</button>
                                <button className='w-full mb-3 border-2 border-red-500 py-3 rounded-lg hover:bg-red-200 hover:bg-opacity-30 transition-all'>Delete This Chat</button>
                                <button className='w-full mb-3 border-2 border-yellow-500 py-3 rounded-lg hover:bg-yellow-200 hover:bg-opacity-30 transition-all'>Delete All Chats</button>
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

        <div className='h-[calc(100vh-73px)] w-full min-h-fit bg-[#343541]'>
            <div className='w-full h-[85%] px-20 py-10 flex flex-col overflow-y-scroll' style={{scrollbarWidth: "thin"}}>
                {
                    (chat.length > 0) && (
                        chat.map((message, index) => (
                            <div className='w-full h-fit mb-3' key={index} >
                                <div style={{ float: 'left' }} className='bg-gray-100 w-fit px-5 py-3 rounded-r-lg rounded-t-lg'>
                                    {message.content}
                                </div>

                                <div style={{ float: 'right' }} className='bg-[#10a37f] w-fit px-5 py-3 rounded-l-lg rounded-t-lg mt-10 break-words max-w-md'>
                                    {
                                        (responsePending && chatResponses[index] === undefined) ? (
                                            console.log(chatResponses[index]),
                                            <DotDotDot />
                                        ) : (
                                            chatResponses[index]
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    )   
                }
            </div>

            <div className=' bg-[#33363f] w-full h-[15%] py-3 flex justify-center items-center border-t-[1px] border-[rgb(0,255,123)]'>
                <input type="text" placeholder="ayo wassup ma home BOYY!!!" value={message.content} onChange={ handleChange } onKeyDown={ handleKeyDown } className='w-[80%] h-fit px-5 py-3 rounded-sm outline-1 bg-[#40414f] text-white focus:outline focus:outline-[rgb(0,255,123)] focus:shadow-[rgba(0,255,123,0.2)_0_0_5px_5px] transition-all duration-300'></input>
            </div>
        </div>
    </div>
  )
}

export default ChatBot