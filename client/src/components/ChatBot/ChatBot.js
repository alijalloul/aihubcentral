import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion';

import CodeEditor from '../CodeEditor/CodeEditor';
import LoadingDots from '../LoadingDots/LoadingDots';

const ChatBot = () => {
    const userInfo = useSelector(state => state?.user?.userInfo);
    const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

    const [loading, setLoading] = useState(false);

    const [chatsCounter, setChatsCounter] = useState(1);

    const [selectedChat, setSelectedChat] = useState(0);

    const [chatsName, setChatsNames] = useState(["Chat 1"]);
    const [changeNameState, setChangeNameState] = useState(false);
    const [newName, setNewName] = useState("");

    const [chats, setChats] = useState([[]]);
    const [chatsResponses, setChatsResponses]= useState([[]]);
    const [message, setMessage] = useState({
        role: "",
        content: ""
    });
    
    const sendChat = async (selectedChatProp, chatsProp) => {
        try {
            const res = await fetch(`${BASE_URL}/api/openai/chatGPT`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ chat: chatsProp[selectedChatProp] }),
            });
            
            const data = await res.json();

            if (data !== undefined && data.chatResponse !== undefined) {
                const updatedResponses = await Promise.resolve(chatsResponses[selectedChatProp]).then((prevChatResponses) =>
                  [...prevChatResponses, data.chatResponse]
                );
                setChatsResponses((prevChatsResponses) =>
                prevChatsResponses.map((prevChatResponses, index) =>
                    (index === selectedChatProp)? updatedResponses : prevChatResponses
                  )
                );
            
                setLoading(false);
              }
        } catch (error) {
            console.log(error);

            setLoading(false);
        } finally{
            console.log("finally");
            setLoading(false);
        }
    }

    const handleMessageChange = (e) => {
        setMessage({role:"user", content:e.target.value});
    }
    const handleMessageKeyDown = async (e) => {
        if (e.key === 'Enter') {
            setChats(prevChats => {
                const newChats = prevChats.map((prevChat, index) => {
                    if (index === selectedChat) {
                        return [...prevChat, message];
                    } else {
                        return prevChat;
                    }
                });
                sendChat(selectedChat, newChats);
                return newChats;
            });
            setMessage({role:"", content:""});
            setLoading(true);
        }        
    };
    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }
    const handleNameKeyDown = async (e) => {
        if (e.key === 'Enter') {
            console.log("newname", e.target)
            setChatsNames(prevChatsName => prevChatsName.filter((prevChatName, index) => (index === e.target.key) ? newName : prevChatName ));
            setChangeNameState(false);
            setNewName("");
        }        
    };
  return (
    <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} 
        className='h-[calc(100vh-73px)] w-full flex bg-slate-50 sm:h-[calc(100vh-150px)]'>
        <div className='float-left bg-[#202123] w-[20vw] shadow-xl shadow-black relative z-1 sm:hidden'>
            {
                (userInfo) ? (
                    <div className='h-full px-5 flex justify-between items-center text-white'>
                        <div className='w-full h-[90%] flex items-center flex-col justify-between'>
                            <div className='w-full flex flex-col'>
                                {
                                    chats.map((_, index1) => (
                                        <div key={index1} className={`flex items-center w-full h-12 mb-1 px-2 rounded-lg ${(selectedChat===index1 ) && "bg-[#454757]" } hover:bg-[#6b6e82]  transition-all`}>
                                            <button onClick={() => {setSelectedChat(index1)}} className={` ${changeNameState ? "hidden" : "static"} w-[80%] h-full`}>{chatsName[index1]}</button>
                                            <input 
                                                key={index1}
                                                value={newName}
                                                onChange={handleNameChange}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        setChatsNames(prevChatsName => prevChatsName.filter((prevChatName, index2) => (index2 === index1) ? (newName,console.log("jep")) : prevChatName ));
                                                        setChangeNameState(false);
                                                        setNewName("");
                                                    }   
                                                }}
                                                className={`${changeNameState ? "static" : "hidden"} w-[80%] h-[60%] bg-transparent focus:outline-none`}></input>
                                            
                                            <div className='flex justify-between items-center w-[20%] h-[80%]'>
                                                <button onClick={() => {setChangeNameState(true)}}>E</button>

                                                <button onClick={() => {
                                                    if(selectedChat > 0){
                                                        setSelectedChat(prevSelectedChat => prevSelectedChat - 1)
                                                    }else{
                                                        setSelectedChat(0)
                                                    } 
                                                    if(chats.length > 1){
                                                        setChats(prevChats => prevChats.filter((_, index2) => index2 !== index1)); 
                                                        setChatsResponses(prevChatsResponses => prevChatsResponses.filter((_, index2) => index2 !== index1));
                                                        setChatsNames(prevChatsNames => prevChatsNames.filter((_, index2) => index2 !== index1));
                                                    }
                                                }} 
                                                className={`relative z-20 w-fit h-fit`}>D</button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className='w-full flex flex-col'>
                                <button onClick={() => {
                                        setChats([...chats, []]); 
                                        setChatsResponses([...chatsResponses, []]);
                                        setChatsNames([...chatsName, `Chat ${chatsCounter + 1}`])
                                        setChatsCounter(prevCounter => prevCounter + 1);
                                        console.log(chatsName)
                                    }
                                } className='w-full mb-3 text-black border-2 bg-green-300 border-green-500 py-3 rounded-lg hover:bg-green-400 hover:bg-opacity-30 transition-all'>Create New chats</button>
                                <button onClick={() => {
                                    if(selectedChat > 0){
                                        setSelectedChat(prevSelectedChat => prevSelectedChat - 1)
                                    }else{
                                        setSelectedChat(0)
                                    } 
                                    if(chats.length > 1){
                                        setChats(prevChats => prevChats.filter((_, index) => index !== selectedChat)); 
                                        setChatsResponses(prevChatsResponses => prevChatsResponses.filter((_, index) => index !== selectedChat));
                                        setChatsNames(prevChatsNames => prevChatsNames.filter((_, index) => index !== selectedChat));
                                    }}
                                } 
                                className='w-full mb-3 text-black border-2 bg-red-300 border-red-500 py-3 rounded-lg hover:bg-red-400 hover:bg-opacity-30 transition-all'>Delete This chats</button>
                                
                                <button onClick={() => {
                                        setChats([[]]); 
                                        setChatsResponses([[]])
                                        setChatsNames(["Chat 1"]);
                                        setChatsCounter(1);
                                    }
                                } className='w-full mb-3 text-black border-2 bg-yellow-300 border-yellow-500 py-3 rounded-lg hover:bg-yellow-400 hover:bg-opacity-30 transition-all'>Delete All chats</button>
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
                    (chats[selectedChat].length > 0) && (
                        chats[selectedChat].map((message, index1) => (
                            <div className='w-full h-fit' key={index1} >
                                <div className='userMessages px-48 bg-white w-full py-8 border-y-2 border-gray-300 sm:px-10'>
                                    {message.content}
                                </div>

                                <div className='gptMessages font-semibold px-48 bg-gray-100 text-black w-full py-8 sm:px-10'>
                                    {
                                        (!chatsResponses[selectedChat][index1] && loading) ? (
                                            <div className=' text-3xl tracking-widest'>
                                                <LoadingDots />
                                            </div>
                                        ) : (
                                            chatsResponses[selectedChat][index1].includes('```') ? (
                                                chatsResponses[selectedChat][index1].split('```').map((e, index2) => (
                                                    (index2 % 2 === 0) ? (
                                                        {e}
                                                    ) : (
                                                        <CodeEditor code={e} language="javascript"  />   
                                                    )
                                                ))
                                            ) : (
                                                chatsResponses[selectedChat][index1]
                                            )
                                        )
                                        //chatsResponses[selectedChat][index1]
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
                    placeholder="Start chatting!" 
                    disabled={loading}
                    value={message.content} 
                    onChange={ handleMessageChange } 
                    onKeyDown={ handleMessageKeyDown } 
                    className='w-[60%] h-fit px-5 py-3 rounded-lg outline-none border-1 border-gray-300 text-black shadow-[rgba(0,0,0,0.05)_0_0_10px_10px] transition-all duration-300 sm:w-[80%]'></input>
            </div>
        </div>
    </motion.div>
  )
}

export default ChatBot