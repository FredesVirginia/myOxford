import React, { useState, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";

interface AudioRecorderProps {
  onRecord: (audio: Blob) => void;
  onStop: () => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecord }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        });
        mediaRecorderRef.current.start();
      });
    } else {
      mediaRecorderRef.current?.stop();
      audioChunksRef.current = [];
    }
  }, [isRecording]);

  useEffect(() => {
    if (!isRecording && mediaRecorderRef.current) {
      mediaRecorderRef.current.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
        onRecord(audioBlob);
      });
    }
  }, [isRecording, onRecord]);

  const handlePlay = () => {
    if (audioRef.current && audioChunksRef.current.length > 0) {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
      audioRef.current.src = URL.createObjectURL(audioBlob);
      audioRef.current.play();
    }
  };

  const handleStop = () => {
    if (audioRef.current && audioRef.current.paused === false) {
      audioRef.current.pause();
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <button
          className={`${isRecording ? "bg-red-500" : "bg-blue-500"} text-white font-bold py-2 px-4 rounded mr-2`}
          onClick={() => setIsRecording(!isRecording)}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        <button className="bg-green-500 text-white font-bold py-2 px-4 rounded mr-2" onClick={handlePlay}>
          Play
        </button>
        <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleStop}>
          Stop
        </button>
        <button className="bg-yellow-500 text-white font-bold py-2 px-4 rounded" onClick={() => setIsRecording(false)}>
          Stop Recording
        </button>
      </div>
      {audioChunksRef.current.length > 0 && (
        <>
          <audio ref={audioRef} className="w-full mt-4" />
        </>
      )}
      {!isRecording && audioChunksRef.current.length === 0 && <p className="text-center mt-4">No audio recorded.</p>}
    </div>
  );
};

export default AudioRecorder;
