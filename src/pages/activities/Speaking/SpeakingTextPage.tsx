import { FaMicrophone, FaStop, FaPlay } from "react-icons/fa";
import { IoMdPlay } from "react-icons/io";
import { getColor } from "../../../helpers/getColor";
import { GiLightningFrequency } from "react-icons/gi";


import { useRef, useState } from "react";


const SpeakingTextPage = () => {


    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    let mediaRecorder: MediaRecorder | null = null;
    let chunks: Blob[] = [];

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: "audio/wav" });
                setAudioUrl(URL.createObjectURL(blob));
            };
            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    const playRecording = () => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        }
    };

    return (
        <div>
            <h1 className="text-2xl text-center"> Hola Text </h1>
            <div className="flex justify-center space-x-4">


                <div className="flex flex-col items-center space-y-2">
                    <FaMicrophone style={{ backgroundColor: getColor("my-speaking"), color: "white", borderRadius: "100%" }} className="  text-4xl fill-white w-[80px] h-[80px] p-3 " />
                    <button style={{ border: "solid", borderColor: getColor("my-speaking"), color: getColor("my-speaking") }} className="bg-white ">
                        Top to Speaking
                    </button>
                </div>


                <div className="flex flex-col items-center space-y-2">
                    <IoMdPlay style={{ backgroundColor: getColor("my-speaking"), color: "white", borderRadius: "100%" }} className="  text-4xl fill-white w-[70px] h-[80px] p-3 " />
                    <button style={{ border: "solid", borderColor: getColor("my-speaking"), color: getColor("my-speaking") }} className="bg-white ">
                        Hear your Record
                    </button>
                </div>



                <div>
                </div>

            </div>

            <div className="flex flex-col items-center space-y-2">
                {isRecording ? (
                    <button onClick={stopRecording}>Stop Recording</button>
                ) : (
                    <button onClick={startRecording}>Start Recording</button>
                )}
                {audioUrl && (
                    <div className="flex flex-col items-center space-y-2">
                        <button onClick={playRecording}>Play Recording</button>
                        <audio src={audioUrl} controls />
                    </div>
                )}
            </div>


        </div>
    )

}

export default SpeakingTextPage;