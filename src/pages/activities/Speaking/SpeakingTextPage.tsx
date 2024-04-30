import { FaMicrophone, FaStop, FaPlay, FaPause } from "react-icons/fa";
import { IoMdPlay } from "react-icons/io";
import { getColor } from "../../../helpers/getColor";
import { GiLightningFrequency } from "react-icons/gi";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";

import { useEffect, useRef, useState } from "react";


interface AudioRecorderProps {
    onRecord: (audio: Blob) => void;
    onStop: () => void;
}

const SpeakingTextPage: React.FC<AudioRecorderProps> = ({ onRecord, onStop }) => {
    const [requestGET, setRequestGet] = useState(
        {
            questionID: "dwew2",
            text: "I am Blue",
            textTraslation: "Yo soy Azul"
        }
    );
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [mostrar, setMostrar] = useState(false);
    const [parar, setParar] = useState(false);
    const [play, setPlay] = useState(false);
    const handleMostrar = (value: boolean) => {

        setMostrar(value);
        setIsRecording(!isRecording);
    }

    const handleParar = (value: boolean) => {

        setParar(value);
        handleStop();
    }

    useEffect(() => {
        if (isRecording) {
            navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
                mediaRecorderRef.current = new MediaRecorder(stream);
                mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
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
            mediaRecorderRef.current.addEventListener('stop', () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
                onRecord(audioBlob);
            });
        }
    }, [isRecording, onRecord]);

    const handlePlay = () => {
        if (audioRef.current && audioChunksRef.current.length > 0) {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
            audioRef.current.src = URL.createObjectURL(audioBlob);
            audioRef.current.play();
        }
    };

    const handlePlay2 = (value: boolean) => {
        setIsRecording(false)
        setPlay(value);

        handlePlay();
    }
    const handleStop = () => {
        setPlay(false);
        if (audioRef.current && audioRef.current.paused === false) {
            audioRef.current.pause();
        }
    };

    return (
        <ActivityLayout 
        saveProps={{ className: " font-semibold py-4 w-[220px] text-center  bg-my-brown-700" }}
        nextProps={{ className: " font-semibold py-4 w-[220px] text-center  bg-my-brown-700" }}
        theme="unscramble"
        acitivityHeader={{
          acitivity: "TOPIC NAME",
          quest: "A1 GRAMMAR , QUEST 2",
          description: "Task : Speaking",
          instruction: "Look at the words and record your voice saying the word to see",
          info : "Write the sentences in order"
        }}
        primaryColor={getColor("my-brown-700")}
        >
            <div>

                <h1 style={{ color: getColor("my-purple-900") }} className="text-center text-3xl font-bold"> {requestGET.text}</h1>
                <h2 style={{ color: getColor("my-purple-500") }} className="text-center text-2xl"> {requestGET.textTraslation}</h2>

                <div className=" py-4 px-3 flex spca-x-10 justify-center">

                    <div className="flex flex-col items-center space-y-2">
                        {mostrar ? (
                            <GiLightningFrequency
                                onClick={() => handleMostrar(false)}
                                style={{
                                    backgroundColor: parar ? getColor("my-speaking") : getColor("my-speaking-300"),
                                    color: "white",
                                    borderRadius: "100%"
                                }}
                                className="  text-4xl fill-white w-[80px] h-[80px] p-3 " />
                        ) : (
                            <FaMicrophone onClick={() => handleMostrar(true)} style={{ backgroundColor: getColor("my-speaking"), color: "white", borderRadius: "100%" }}
                                className="  text-4xl fill-white w-[80px] h-[80px] p-3 " />
                        )}

                        <button
                            onClick={() => handleParar(true)}
                            style={{
                                border: "solid",
                                borderColor: getColor("my-speaking"),
                                color: getColor("my-speaking"),
                                backgroundColor: parar ? "white" : (mostrar ? getColor("my-speaking-300") : "white"),
                                ...(!mostrar && { backgroundColor: 'white' })
                            }}

                            className="bg-white hover:bg-white "
                        >
                            Stop to Speaking
                        </button>
                    </div>


                    <div className="flex flex-col items-center space-y-2">


                        {
                            play ? (
                                <FaPause
                                    onClick={handleStop}
                                    style={{
                                        backgroundColor: play ? getColor("my-speaking-300") : "white",
                                        color: "white", borderRadius: "50%"
                                    }}
                                    className="  text-sm fill-white w-[80px] h-[80px] p-5 "

                                />


                            ) : (
                                <IoMdPlay style={{ backgroundColor: getColor("my-speaking"), color: "white", borderRadius: "100%" }} className=" pl-5 text-4xl fill-white w-[80px] h-[80px] p-3 " />
                            )
                        }
                        <button
                            onClick={() => handlePlay2(true)}
                            style={{
                                backgroundColor: parar ? getColor("my-speaking-300") : "white",
                                border: "solid",
                                borderColor: getColor("my-speaking"),
                                color: getColor("my-speaking")
                            }} className="bg-white ml-5 ">
                            Hear your Record
                        </button>
                    </div>


                </div>

                {audioChunksRef.current.length > 0 && (
                    <>
                        <audio ref={audioRef} className="w-full mt-4 bg-red-700" />
                    </>
                )}
                {!isRecording && audioChunksRef.current.length === 0 && (
                    <p className="text-center mt-4">No audio recorded.</p>
                )}
            </div>
        </ActivityLayout>
    );
};

export default SpeakingTextPage;