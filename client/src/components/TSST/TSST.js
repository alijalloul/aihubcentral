import React, { useState } from 'react';

const TSST = () => {
  const [recording, setRecording] = useState(false);
  const [audioData, setAudioData] = useState(null);

  let mediaRecorder;
  let chunks = [];

  const handleRecordClick = () => {
    if (!recording) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          mediaRecorder = new MediaRecorder(stream);
          chunks = [];

          mediaRecorder.addEventListener('dataavailable', event => {
            chunks.push(event.data);
          });

          mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(chunks, { type: 'audio/webm' });

            const reader = new FileReader();
            reader.onloadend = () => {
              const base64Data = reader.result.split(',')[1];
              setAudioData(base64Data);
            };
            reader.readAsDataURL(audioBlob);
          });

          mediaRecorder.start();
          setRecording(true);

          setTimeout(() => {
            mediaRecorder.stop();
            setRecording(false);
          }, 5000);
        })
        .catch(error => {
          console.error('Error accessing microphone:', error);
        });
    }
  };

  const handleUploadClick = () => {
    if (audioData) {
      fetch('http://localhost:5000/api/openai/transcriber', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioData })
      })
      .then(response => response.json())
      .then(transcription => {
        console.log('Transcription:', transcription);
        // Handle the transcription response
      })
      .catch(error => {
        console.error('Error uploading audio:', error);
      });
    }
  };

  return (
    <div>
      <button onClick={handleRecordClick}>{recording ? 'Stop Recording' : 'Start Recording'}</button>
      <button onClick={handleUploadClick} disabled={!audioData}>Upload</button>
    </div>
  );
};

export default TSST;
