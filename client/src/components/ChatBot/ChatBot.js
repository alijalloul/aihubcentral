import React, { useEffect, useState } from 'react'

import DotDotDot from './DotDotDot/DotDotDot';

const ChatBot = () => {
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
                alert(error);

                setResponsePending(false);
            } finally{
                setResponsePending(false);
            }
        }

        if(chat.length > 0) {post();}
    },[chat]);

  return (
    <div className='h-[calc(100vh-73px)] w-full min-h-fit'>
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
        <div className=''>

        </div>
    </div>
  )
}

export default ChatBot