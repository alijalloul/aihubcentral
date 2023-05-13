import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { LazyMotion, domAnimation, m } from "framer-motion";

import CodeEditor from '../CodeEditor/CodeEditor';
import LoadingDots from '../LoadingDots/LoadingDots';

import image1 from "../../img/1.png"
import image2 from "../../img/2.png"
import image3 from "../../img/3.png"
import image4 from "../../img/4.png"
import image5 from "../../img/5.png"
import image6 from "../../img/6.png"
import image7 from "../../img/7.png"
import image8 from "../../img/8.png"

const ChatBot = () => {
    const userInfo = useSelector(state => state?.user?.userInfo);
    const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

    const excludedDivRef = useRef();
    const excludedDivRef2 = useRef();

    const [showImportInfo, setShowImportInfo] = useState(false)

    const [loading, setLoading] = useState(false);

    const [chatsCounter, setChatsCounter] = useState(1);

    const [selectedChat, setSelectedChat] = useState(0);

    const [chatsName, setChatsNames] = useState(["Chat 1"]);
    const [changeNameState, setChangeNameState] = useState(false);
    const [newName, setNewName] = useState("");
    const [nameChangeIndex, setChangeNameIndex] = useState(null);

    const [chatsMessages, setChatsMessages] = useState([[]]);
    const [chatsResponses, setChatsResponses]= useState([[]]);
    const [chats, setChats]= useState([[]]);
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
                  [...prevChatResponses, {role: "assistant", content:data.chatResponse}]
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
            setLoading(false);
        }
    }

    const handleMessageChange = (e) => {
        setMessage({role:"user", content:e.target.value});
    }
    const handleMessageKeyDown = async (e) => {
        if (e.key === 'Enter') {
            setChatsMessages(prevChats => {
                const newChatsMessanges = prevChats.map((prevChat, index) => {
                    if (index === selectedChat) {
                        return [...prevChat, message];
                    } else {
                        return prevChat;
                    }
                });

                return newChatsMessanges;
            });

            setMessage({role:"", content:""});
            setLoading(true);
        }        
    }

    useEffect(() => {console.log("chatsMessages", chatsMessages); console.log("chatsResponses", chatsResponses)}, [chatsResponses])
    useEffect(() => {if(chatsMessages[selectedChat].length > chatsResponses[selectedChat].length){console.log(chats); sendChat(selectedChat, chats)}}, [chats])

    useEffect(() => {
        // create a new array to hold the updated chats
        const updatedChats = [];
      
        // loop through each chat
        for (let i = 0; i < chatsMessages.length; i++) {
          const chat = [];
      
          // loop through each message and response pair
          for (let j = 0; j < Math.max(chatsMessages[i].length, chatsResponses[i].length); j++) {
            // add the message to the chat if it exists
            if (chatsMessages[i][j]) {
              chat.push(chatsMessages[i][j]);
            }
            // add the response to the chat if it exists
            if (chatsResponses[i][j]) {
              chat.push(chatsResponses[i][j]);
            }
          }
      
          // add the chat to the updated chats array
          updatedChats.push(chat);
        }
      
        console.log(updatedChats)
        // update the chats state with the updated chats array
        setChats(updatedChats);
      }, [chatsMessages, chatsResponses]);

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }
    
    const handleFileUpload = (event) => {
        const reader = new FileReader();
        reader.readAsText(event.target.files[0]);
        reader.onload = function(event) {            
            JSON.parse(event.target.result).map((e1,index) => {
                setChatsNames(prevTitle => [...prevTitle, e1.title])

                if(index === 0 && chatsMessages[chatsMessages.length-1].length === 0){
                    setChatsMessages(prevF1 => [...prevF1, []]);
                }
                if(index === 0 && chatsResponses[chatsResponses.length-1].length === 0){
                    setChatsResponses(prevF2 => [...prevF2, []]);
                }

                for (let key in e1.mapping) {
                    if(e1.mapping[key]?.message?.content?.parts[0] !== "" && e1.mapping[key].message !== null){
                        if(e1.mapping[key]?.message?.author.role === "user"){ 
                            setChatsMessages(prevF1 =>  [...prevF1.slice(0, -1), [...prevF1[prevF1.length -1], {role:"user", content: e1.mapping[key]?.message?.content?.parts[0]}]])
                        }else if(e1.mapping[key]?.message?.author.role === "assistant"){
                            setChatsResponses(prevF2 =>  [...prevF2.slice(0, -1), [...prevF2[prevF2.length -1], {role: "assistant", content: e1.mapping[key]?.message?.content?.parts[0]}]])
                        }
                    }
                }
                if(index + 1 !== JSON.parse(event.target.result).length){
                    setChatsMessages(prevF1 => [...prevF1, []]);
                    setChatsResponses(prevF2 => [...prevF2, []]);
                }
            })
        };
    }

    useEffect(() => {
        // Event listener for clicks outside of the excluded div
        function handleClickOutside(event) {
            if((excludedDivRef.current && !excludedDivRef.current.contains(event.target)) || (excludedDivRef2.current && !excludedDivRef2.current.contains(event.target)) ) {
                setChangeNameState(false);
                setShowImportInfo(false);
                console.log("cat");
            }
        }

        excludedDivRef?.current?.focus();
    
        // Add event listener when component mounts
        if (changeNameState || showImportInfo) {
          window.addEventListener("mousedown", handleClickOutside);
        }
    
        // Remove event listener when component unmounts
        return () => {
          window.removeEventListener("mousedown", handleClickOutside);
        };
      }, [changeNameState, showImportInfo]);
  return (
    <LazyMotion features={domAnimation}> 
        <m.div  
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} 
            className='h-[calc(100vh-73px)] w-full bg-slate-50 md:h-[calc(100vh-120px)]'>
        
                <div ref={excludedDivRef2} style={{boxShadow: "15px 15px 20px rgba(0,0,0,0.8)"}} className={`absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white aspect-square z-10 overflow-y-scroll ${showImportInfo ? "w-[40vw] px-10 py-10 " : "w-[0px]"} transition-all ease-in-out`}>
                    <div className='relative w-full'>
                        <button onClick={() => setShowImportInfo(false)} className=' absolute right-0 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 transition-all ease-in-out duration-200'>x</button>
                    </div>
                     <p className='mb-2'>To import your chatsMessages from chatGPT:</p>
                     <div className='px-3'>
                        <p className='mb-2'>Go to https://chat.openai.com/ and login with your account:</p>
                        <img src={image1} className='rounded-lg mb-2'/>

                        <p className='mb-2'>Click on the three dots on the bottom left corner besides your email:</p>
                        <img src={image2} className='rounded-lg mb-2'/>

                        <p className='mb-2'>Click on settings:</p>
                        <img src={image3} className='rounded-lg mb-2'/>

                        <p className='mb-2'>Click on Data Controls:</p>
                        <img src={image4} className='rounded-lg mb-2'/>

                        <p className='mb-2'>Click on Export:</p>
                        <img src={image5} className='rounded-lg mb-2'/>

                        <p className='mb-2'>Confirm:</p>
                        <img src={image6} className='rounded-lg mb-2'/>

                        <p className='mb-2'>You should get an email from openAI containing a "download data export" button:</p>
                        <img src={image7} className='rounded-lg mb-2'/>

                        <p className='mb-2'>This will download a zip folder containing a “conversations.json”. ONLY upload this file and then you should have your chatsMessages uploaded accordingly</p>
                        <img src={image8} className='rounded-lg mb-2'/>
                     </div>
                </div>
                <div className={`w-full h-full flex ${showImportInfo && " opacity-50 pointer-events-none"} transition-all ease-out duration-200`}>
                <div className='float-left bg-[#202123] w-[20vw] md:w-[32vw] shadow-xl shadow-black relative z-1 sm:hidden'>
                    <div className='h-full flex justify-between items-center text-white'>
                        <div className='w-full h-[90%] flex items-center flex-col justify-between'>
                            <div style={{scrollbarWidth: "thin"}} className='w-full inline-block items-center overflow-hidden px-2 overflow-y-scroll'>
                                {
                                    chatsMessages.map((_, index1) => (
                                        <div key={index1} className={`flex justify-end items-center w-full h-12 mb-1 px-2 rounded-lg ${(selectedChat===index1 ) && "bg-[#454757]" } hover:bg-[#6b6e82]  transition-all`}>
                                            
                                            
                                            {
                                                (changeNameState && index1 === nameChangeIndex) ? (
                                                    <div className=' w-[80%] h-full md:w-[60%]'>
                                                        <input 
                                                        ref={(index1 === nameChangeIndex) ? excludedDivRef : null}
                                                        key={index1}
                                                        value={newName}
                                                        onChange={handleNameChange}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                setChatsNames(prevChatsName => prevChatsName.map((prevChatName, index2) => (index2 === index1) ?  ((newName === "") ? prevChatName : newName) : prevChatName));
                                                                setChangeNameState(false);
                                                            }   
                                                        }}
                                                        className={`w-full h-full bg-transparent focus:outline-none transition-all ease-in-out duration-200`}></input>
                                                    </div>
                                                ) : (
                                                    <button onClick={() => {setSelectedChat(index1)}} className={`w-[80%] flex justify-start items-center h-full overflow-hidden whitespace-nowrap`}>{chatsName[index1]}</button>
                                                )
                                            }
                                            <div className='flex justify-between items-center w-[20%]  md:w-[40%] h-[80%]'>
                                                <button onMouseUp={() => {setChangeNameState(true); setChangeNameIndex(index1); setNewName(chatsName.filter((prevChatName, index2) => (index2 === index1) && prevChatName)[0])}}>
                                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="rgb(200,200,200)" xmlns="http://www.w3.org/2000/svg" className=' hover:fill-[rgb(240,240,240)] transition-all ease-in-out'>
                                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                        <g id="SVGRepo_iconCarrier"> 
                                                            <g id="Edit / Edit_Pencil_Line_02"> 
                                                                <path id="Vector" d="M4 20.0001H20M4 20.0001V16.0001L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L8 20.0001L4 20.0001Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
                                                            </g> 
                                                        </g>
                                                    </svg>
                                                </button>
                                                <button onClick={() => {
                                                    if(selectedChat > 0){
                                                        setSelectedChat(prevSelectedChat => prevSelectedChat - 1)
                                                    }else{
                                                        setSelectedChat(0)
                                                    } 
                                                    if(chatsMessages.length > 1){
                                                        setChatsMessages(prevChatsMessages => prevChatsMessages.filter((_, index2) => index2 !== index1)); 
                                                        setChatsResponses(prevChatsResponses => prevChatsResponses.filter((_, index2) => index2 !== index1));
                                                        setChats(prevChats => prevChats.filter((_, index2) => index2 !== index1));
                                                        setChatsNames(prevChatsNames => prevChatsNames.filter((_, index2) => index2 !== index1));
                                                    }
                                                }} 
                                                className={`relative z-20 w-fit h-fit`}>
                                                    <svg width="15px" height="15px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="white"  className=' hover:fill-red-500 transition-all ease-in-out'>
                                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                        <g id="SVGRepo_iconCarrier"> 
                                                            <title>delete [#1487]</title> 
                                                            <desc>Created with Sketch.</desc> 
                                                            <defs> </defs> 
                                                            <g id="Page-1" stroke="none" strokewidth="1"fillRule="evenodd"> 
                                                                <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)"> 
                                                                    <g id="icons" transform="translate(56.000000, 160.000000)"> 
                                                                        <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#1487]"> 
                                                                        </path> 
                                                                    </g> 
                                                                </g> 
                                                            </g> 
                                                        </g>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className='w-full flex flex-col px-4'>
                                <div className='w-full mb-5'>
                                    <p>Import your chatsMessages from ChatGPT</p>
                                    <div className='w-full flex justify-center items-center'>
                                        <label for="chat-file" className='mr-1 block w-[90%] text-black text-center bg-gray-100 rounded-lg border-1 hover:bg-gray-300 transition-all duration-200 ease-in-out hover:cursor-pointer'>Browse</label>
                                        <button onClick={() => {setShowImportInfo(true)}} className='flex justify-center items-center aspect-square rounded-full p-2 text-white border-2 border-white hover:bg-[rgba(255,255,255,0.3)] hover:cursor-pointer transition-all ease-in-out duration-200'>?</button>
                                    </div>
                                    <input type="file" id="chat-file" name="chat-file" onChange={handleFileUpload} className='hidden'/>
                                </div>

                                <button onClick={() => {
                                        setChatsMessages([...chatsMessages, []]); 
                                        setChatsResponses([...chatsResponses, []]);
                                        setChats([...chats, []]);
                                        setChatsNames([...chatsName, `Chat ${chatsCounter + 1}`])
                                        setChatsCounter(prevCounter => prevCounter + 1);
                                        console.log(chatsName)
                                    }
                                } className='w-full mb-3 text-black border-2 bg-green-300 border-green-500 py-3 rounded-lg hover:bg-green-400 hover:bg-opacity-30 transition-all'>Create New chatsMessages</button>
                                <button onClick={() => {
                                    if(selectedChat > 0){
                                        setSelectedChat(prevSelectedChat => prevSelectedChat - 1)
                                    }else{
                                        setSelectedChat(0)
                                    } 
                                    if(chatsMessages.length > 1){
                                        setChatsMessages(prevChatsMessages => prevChatsMessages.filter((_, index) => index !== selectedChat)); 
                                        setChatsResponses(prevChatsResponses => prevChatsResponses.filter((_, index) => index !== selectedChat));
                                        setChats(prevChats => prevChats.filter((_, index) => index !== selectedChat)); 
                                        setChatsNames(prevChatsNames => prevChatsNames.filter((_, index) => index !== selectedChat));
                                    }}
                                } 
                                className='w-full mb-3 text-black border-2 bg-red-300 border-red-500 py-3 rounded-lg hover:bg-red-400 hover:bg-opacity-30 transition-all'>Delete This chatsMessages</button>
                                
                                <button onClick={() => {
                                        setChatsMessages([[]]); 
                                        setChatsResponses([[]])
                                        setChats([[]]);
                                        setChatsNames(["Chat 1"]);
                                        setChatsCounter(1);
                                    }
                                } className='w-full mb-3 text-black border-2 bg-yellow-300 border-yellow-500 py-3 rounded-lg hover:bg-yellow-400 hover:bg-opacity-30 transition-all'>Delete All chatsMessages</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full'>
                    <div className='w-full h-[80%] flex flex-col overflow-y-scroll' style={{scrollbarWidth: "thin"}}>
                    {
                        (chatsMessages[selectedChat].length > 0) && (
                            chatsMessages[selectedChat].map((message, index1) => (
                                <div className='w-full h-fit' key={index1} >
                                    <div className='userMessages px-48 bg-white w-full py-8 border-y-2 border-gray-300 md:px-10'>
                                        {message.content}
                                    </div>

                                    <div className='gptMessages font-semibold px-48 bg-gray-100 text-black w-full py-8 md:px-10'>
                                        {
                                            (!chatsResponses[selectedChat][index1] && loading) ? (
                                                <div className=' text-3xl tracking-widest'>
                                                    <LoadingDots />
                                                </div>
                                            ) : (
                                                // chatsResponses[selectedChat][index1].includes('```') ? (
                                                //     chatsResponses[selectedChat][index1].split('```').map((e, index2) => (
                                                //         (index2 % 2 === 0) ? (
                                                //             {e}
                                                //         ) : (
                                                //             <CodeEditor code={e} language="javascript"  />   
                                                //         )
                                                //     ))
                                                // ) : (
                                                //     chatsResponses[selectedChat][index1]
                                                // )
                                                (chatsResponses[selectedChat][index1]) ? (
                                                    chatsResponses[selectedChat][index1].content
                                                ): (
                                                    null
                                                )
                                            )
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
                            className='w-[60%] h-fit px-5 py-3 rounded-lg outline-none border-1 border-gray-300 text-black shadow-[rgba(0,0,0,0.05)_0_0_10px_10px] transition-all duration-300 md:w-[80%]'></input>
                    </div>
                </div>
                </div>
        </m.div >
    </LazyMotion> 
  )
}

export default ChatBot