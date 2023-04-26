import React, { useState, useEffect, useRef } from "react";

import Microphone from "./Microphone/Microphone";
const TSST = () => {
  const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

  const mediaRecorder = useRef(null);
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [transcribtion, setTranscription] = useState("");
  const [audioBlob, setAudioBlob] = useState("");
  const [audioBuffer, setAudioBuffer] = useState("");

  useEffect(() => {
    const initializeMediaRecorder = async () => {
      if ("MediaRecorder" in window) {
        try {
            const streamData = await navigator.mediaDevices.getUserMedia({ audio: true });
            setStream(streamData);
        } catch (err) {
            console.log(err.message);
        }
      } else {
          console.log("The MediaRecorder API is not supported in your browser.");
      }
    }

    initializeMediaRecorder();
  }, [])

  const handleStartRecording = () => {
    const media = new MediaRecorder(stream, { type: "audio/wav" });

    mediaRecorder.current = media;
    mediaRecorder.current.start();

    let chunks = [];
    mediaRecorder.current.ondataavailable = (e) => {
       chunks.push(e.data);
    };
    setAudioChunks(chunks);
  }
  const handleStopRecording = () => {
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);

      setAudioBlob(audioBlob)
      setAudio(audioUrl);
      setAudioChunks([]);

      let file = new File([audioUrl], "recorded_audio.wav",{type:"audio/wav", lastModified:new Date().getTime()});
      let container = new DataTransfer();
      container.items.add(file);
      document.getElementById("audioFile").files = container.files;
      setAudioFile(container.files[0]);

      console.log(file);
    };
  }

  const handleSubmitRecording = async () => {
    try {
      // Assuming you have an audio blob called 'audioBlob'

      // Convert the audio blob to a base64 string
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.split(',')[1]; // Extract base64 data from the result
        const res = await fetch(`${BASE_URL}/api/openai/transcriber`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ audioBuffer: base64String, lang: "en" })
        })
        const data = await res.json();
        setTranscription(data);
      };
      reader.readAsDataURL(audioBlob);

    } catch (error) {
      console.log(error);

    } finally {
    }
  }

    return (
      <div className="h-[calc(100vh-73px)] flex justify-center items-center">
        <div className="w-[40%] flex justify-between items-center">
          <div className="flex flex-col">
            <Microphone startFunction={ handleStartRecording } stopFunction={ handleStopRecording } />
            <button onClick={handleStartRecording} className="w-fit my-10 p-5 bg-gray-200 rounded-lg">Start Recording</button>
            <button onClick={handleStopRecording} className="w-fit mb-10 p-5 bg-gray-200 rounded-lg">Stop Recording</button>

            <audio className="mb-10" src={audio && audio} controls></audio>
            <input id="audioFile" type="file" onChange={ (e) => {setAudioFile(e.target.files[0])}}/>
          </div>
          
          <div>
            <button className="p-10 bg-yellow-500 rounded-xl" onClick={ handleSubmitRecording } >Submit</button>
          </div>
        </div>

        <div className="w-[40%] flex justify-center items-center">
          <textarea value={transcribtion} readOnly className="w-[60%] aspect-square resize-none shadow-lg shadow-black"></textarea>
        </div>
      </div>
    );
};
export default TSST;