import React, { useState, useEffect, useRef } from "react";

import Microphone from "./Microphone/Microphone";
const TSST = () => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState(false);
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);

  useEffect(async () => {
    if ("MediaRecorder" in window) {
      try {
          const streamData = await navigator.mediaDevices.getUserMedia({ audio: true });
          setPermission(true);
          setStream(streamData);
      } catch (err) {
          console.log(err.message);
      }
    } else {
        console.log("The MediaRecorder API is not supported in your browser.");
    }
  }, [])

  const handleStartRecording = () => {
    setRecordingStatus(true);

    const media = new MediaRecorder(stream, { type: "audio/mp3" });

    mediaRecorder.current = media;
    mediaRecorder.current.start();

    let chunks = [];
    mediaRecorder.current.ondataavailable = (e) => {
       chunks.push(e.data);
    };
    setAudioChunks(chunks);
  }
  const handleStopRecording = () => {
    setRecordingStatus(false);

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });

      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);

      let file = new File([audioUrl], "recorded_audio.mp3",{type:"audio/mp3", lastModified:new Date().getTime()});
      let container = new DataTransfer();
      container.items.add(file);
      document.getElementById("audioFile").files = container.files;
    };
  }
    return (
      <div className="h-[calc(100vh-73px)] flex flex-col justify-center items-center">
        <Microphone status={recordingStatus} />{console.log(recordingStatus)}
        <button onClick={handleStartRecording} className="w-fit my-10 p-5 bg-gray-200 rounded-lg">Start Recording</button>
        <button onClick={handleStopRecording} className="w-fit mb-10 p-5 bg-gray-200 rounded-lg">Stop Recording</button>

        <audio className="mb-10" src={audio && audio} controls></audio>
        <input id="audioFile" type="file"/>
      </div>
    );
};
export default TSST;