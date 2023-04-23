import React, { useState } from 'react'

import { languages } from '../../constants/languages';

const Translator = () => {
    const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

    const [selectLanguageFrom, setSelectLanguageFrom] = useState(false);
    const [selectLanguageTo, setSelectLanguageTo] = useState(false);

    const [languageFrom, setLanguageFrom] = useState({language: "Language", nativeWriting:"Language", direction:"ltr"});
    const [languageTo, setLanguageTo] = useState({language: "Language", nativeWriting:"Language", direction:"ltr"});

    const [languageFromOptions, setLanguageFromOptions] = useState(languages);
    const [languageToOptions, setLanguageToOptions] = useState(languages);

    const[textFrom, setTextFrom] = useState("");
    const[textTo, setTextTo] = useState("");

    const switchStateFrom = () => {
        if(selectLanguageFrom === true){
            setSelectLanguageFrom(false);
        }else{
            setSelectLanguageFrom(true);
        }
    }

    const switchStateTo = () => {
        if(selectLanguageTo === true){
            setSelectLanguageTo(false);
        }else{
            setSelectLanguageTo(true);
        }
    }   

    const handleLanguageFrom = (e,language) => {
        setLanguageFrom(language);
        console.log(languages)
        setSelectLanguageFrom(false);
    }
    const handleLanguageTo = (e, language) => {
        setLanguageTo(language);
        setSelectLanguageTo(false);
    }

    const handleSearchLanguageFrom = (e) => {
        const returnValue = () => {
            if(e.target.value.trim() === "" ){
                return languages;
            }else {
                return languages.filter(language => {
                    const values = Object.values(language);
                    return values.some(value => value.toLowerCase().includes(e.target.value.toLowerCase()));
                })
            }
        }
        setLanguageFromOptions(returnValue);
    }

    const handleSearchLanguageTo = (e) => {
        const returnValue = () => {
            if(e.target.value.trim() === "" ){
                return languages;
            }else {
                return languages.filter(language => {
                    const values = Object.values(language);
                    return values.some(value => value.toLowerCase().includes(e.target.value.toLowerCase()));
                })
            }
        }
        setLanguageToOptions(returnValue);
    }

    const handleTextFromChange = (e) => {
        setTextFrom(e.target.value);
    }

    const handleTranslate = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/openai/translator`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({langFrom: languageFrom.language, langTo: languageTo.language, text: textFrom})
            })

            const data = await res.json();

            console.log(data);
            setTextTo(data);
        } catch (error) {
            console.log(error);
        }
    };
  return (
    <div className='w-full h-[calc(100vh-73px)] flex flex-col items-center'>
        <div className='w-[50%] mt-5 mb-10 text-center text-6xl leading-[5rem]'><span className='bg-[rgb(255,50,0)] bg-[linear-gradient(45deg,rgba(255,50,0,1)_0%,rgba(255,132,0,1)_100%)] bg-clip-text text-transparent'>Translate</span> Text from any LANGUAGE using <span className='text-[#1abb98]'>CHAT-GPT</span></div>

        <div className='w-[80%] h-[60%] flex justify-between items-center'>
            <div className='w-[40%] h-full flex flex-col border-2 border-gray-150 shadow-md shadow-gray-500 rounded-lg overflow-hidden'>

            {
                (selectLanguageFrom === true) ? (
                    <div className='h-full'>
                        <input className='w-full h-[10%] text-center' placeholder='Search' onChange={ handleSearchLanguageFrom }></input>
                        <div className='overflow-y-scroll h-[90%]'>
                            {
                                languageFromOptions.map((language, index) => (
                                    <button key={index} onClick={ (e) => handleLanguageFrom(e,language) } className='w-full h-[15%]'>{`${language.language}/${language.nativeWriting}`}</button>
                                ))
                            }
                        </div>  
                    </div>
                ) : (
                        <>
                            <div className='w-full h-[10%]'>
                                <button onClick={ switchStateFrom } className='w-full h-full border'>{languageFrom.language}</button>
                            </div>

                            <div className='w-full h-[80%]'> 
                                <textarea dir={languageFrom.direction} value={textFrom} onChange={handleTextFromChange} className='w-full h-full p-5 outline-none resize-none '></textarea>
                            </div>
                        </>
                )
            }
            </div>

            <button onClick={ handleTranslate } className='px-5 py-5 bg-[rgb(255,50,0)] bg-[linear-gradient(45deg,rgba(255,50,0,1)_0%,rgba(255,132,0,1)_100%)] text-white text-xl font-bold tracking-widest rounded-xl'>Translte</button>

            <div className='w-[40%] h-full flex flex-col border-2 border-gray-150 shadow-md shadow-gray-500 rounded-lg overflow-hidden'>
            {
                (selectLanguageTo === true) ? (
                    <div className='h-full'>
                        <input className='w-full h-[10%] text-center' placeholder='Search' onChange={handleSearchLanguageTo}></input>
                        <div className='overflow-y-scroll h-[90%]'>
                            {
                                languageToOptions.map((language, index) => (
                                    <button key={index} value={language} onClick={ (e) => handleLanguageTo(e,language) } className='w-full h-[15%]'>{`${language.language}/${language.nativeWriting}`}</button>
                                ))
                            }
                        </div>  
                    </div>
                ) : (
                        <>
                            <div className='w-full h-[10%]'>
                                <button onClick={ switchStateTo } className='w-full h-full border'>{languageTo.language}</button>
                            </div>

                            <div className='w-full h-[80%]'> 
                                <textarea dir={languageTo.direction} readOnly value={textTo} className='w-full h-full p-5 outline-none resize-none '></textarea>
                            </div>
                        </>
                )
            }
            </div>
        </div>
    </div>
  )
}

export default Translator