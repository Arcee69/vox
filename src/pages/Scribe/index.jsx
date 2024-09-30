import { useState, useRef } from "react";
import { CgSpinner } from "react-icons/cg";

import Monitor from "../../assets/svg/monitor.svg";
import Chart from "../../assets/svg/chart.svg";
import Data from "../../assets/svg/data.svg";
import Reputation from "../../assets/svg/reputation.svg";

import Shake from "../../assets/png/shake.png";
import VoxScribe from "../../assets/png/VoxScribe.png";

import Time from "../../assets/png/time.svg";
import Insights from "../../assets/png/insight.svg";
import Notification from "../../assets/png/notification.png";
import NotificationB from "../../assets/png/notification-b.png";

const Scribe = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  const deepgramApiKey = import.meta.env.VITE_APP_DEEPGRAM_API_KEY;
  const socket = useRef(null); // Store WebSocket reference
  const recorder = useRef(null); // Store MediaRecorder reference

  const startMicrophone = async () => {
    try {
      if (!socket.current || socket.current.readyState === WebSocket.CLOSED) {
        // Open WebSocket when microphone starts
        const websocket = new WebSocket(
          `wss://api.deepgram.com/v1/listen?punctuate=true`,
          ["token", deepgramApiKey]
        );

        websocket.onopen = () => {
          console.log("WebSocket connection established");
          setLoading(false);

          setInterval(() => {
            const keepAliveMsg = JSON.stringify({ type: "KeepAlive" });
            websocket?.send(keepAliveMsg);
            console.log("Sent KeepAlive message");
          }, 3000);
        };

        websocket.onmessage = (message) => {
          console.log(message, "message");
          const data = JSON.parse(message.data);
          if (data.channel && data.channel.alternatives[0]) {
            const transcription = data.channel.alternatives[0].transcript;
            setTranscript((prev) => prev + " " + transcription);
          }
        };

        websocket.onerror = (error) => {
          console.error("WebSocket Error: ", error);
        };

        websocket.onclose = () => {
          console.log("WebSocket connection closed");
        };

        socket.current = websocket; // Store WebSocket in ref
      }

      // Stop and reset the existing stream if it exists
      if (recorder.current) {
        recorder.current.stop();
      }

      // Start microphone recording
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorder.ondataavailable = (event) => {
        if (
          event.data.size > 0 &&
          socket.current?.readyState === socket.current?.OPEN
        ) {
          socket.current.send(event.data); // Send audio to Deepgram
        } else {
          console.error("WebSocket is not open");
        }
      };

      mediaRecorder.start(250); // Send chunks of audio every 250ms
      recorder.current = mediaRecorder; // Store MediaRecorder in ref

      setIsRecording(true);
    } catch (error) {
      console.error("Microphone access denied: ", error);
    }
  };

  const stopMicrophone = () => {
    // Stop recording and close WebSocket
    if (recorder.current) {
      recorder.current.stop();
      recorder.current = null; // Clear the reference
      setIsRecording(false);
    }

    // Stop all tracks of the stream
    if (recorder.current?.stream) {
      recorder.current.stream.getTracks().forEach((track) => track.stop());
    }

    if (socket.current) {
      const closeMsg = JSON.stringify({ type: "CloseStream" });
      socket.current.send(closeMsg);
      socket.current.close(); // Close WebSocket connection
      socket.current = null; // Reset WebSocket reference
    }
  };

  return (
    <div className="w-full ">
      <div
        style={{
          backgroundImage: `url(${VoxScribe})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="w-11/12 mx-auto mb-[46px] lg:mb-0 h-auto lg:h-[534px] flex  items-center gap-[179px] px-5 lg:px-[80px] py-6"
      >
        <div className="flex flex-col gap-5 w-full mt-10 lg:w-5/12">
          <p className="font-bold text-[#fff] font-satoshi text-center lg:text-left text-[40px] lg:text-[64px]">
            VoxScribe
          </p>
          <p className="text-[#fff] text-[24px] text-center lg:text-left lg:text-[32px] font-satoshi">
            Your expert partner for impactful press releases.
          </p>
        </div>

        <div className="w-full hidden mt-10 bg-[#00040F] rounded-3xl lg:flex flex-col items-center gap-4 p-[50px]">
          <p className="font-satoshi text-center text-base  text-[#fff]">
            Get audio transcription now
          </p>
          <textarea
            type="text"
            value={transcript}
            className="w-full lg:w-[491px] border border-[#fff] bg-opacity-10 outline-none h-[189px] p-4 font-satoshi rounded-lg"
            readOnly
          ></textarea>
          <div className="flex flex-col items-center gap-4">
            {isRecording ? (
              <button
                className="w-full lg:w-[491px] flex items-center justify-center rounded-lg p-4 bg-[#17053E]"
                onClick={stopMicrophone}
              >
                <p className="text-[#fff]">Stop recording</p>
              </button>
            ) : (
              <button
                className="w-full lg:w-[491px] flex items-center justify-center rounded-lg p-4 bg-[#17053E]"
                onClick={startMicrophone}
              >
                <p className="text-[#fff] ">
                  {loading ? (
                    <CgSpinner className="animate-spin text-lg" />
                  ) : (
                    " Use Voxscribe"
                  )}
                </p>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto lg:hidden bg-[#00040F] rounded-3xl flex flex-col gap-4 p-[50px]">
        <p className="font-satoshi text-center text-base lg:text-[18px] text-[#fff]">
          Get audio transcription now
        </p>
        <textarea
          type="text"
          value={transcript}
          className="w-full lg:w-[491px] border border-[#fff] opacity-10 outline-none h-[189px] p-4 font-satoshi rounded-lg"
          readOnly
        ></textarea>
        <div className="flex flex-col items-center gap-4">
          {isRecording ? (
            <button
              className="w-full lg:w-[491px] flex items-center justify-center rounded-lg p-4 bg-[#17053E]"
              onClick={stopMicrophone}
            >
              <p className="text-[#fff]">Stop recording</p>
            </button>
          ) : (
            <button
              className="w-full lg:w-[491px] flex items-center justify-center rounded-lg p-4 bg-[#17053E]"
              onClick={startMicrophone}
            >
              <p className="text-[#fff] ">
                {loading ? (
                  <CgSpinner className="animate-spin text-lg" />
                ) : (
                  " Use Voxscribe"
                )}
              </p>
            </button>
          )}
        </div>
      </div>

      <div className="mt-[60px] mb-[115px] gap-[50px] lg:gap-[154px] flex flex-col w-full">
        <div className="w-10/12 mx-auto flex flex-col gap-[32px] ">
          <p className="text-[28px] lg:text-[48px] font-satoshi font-bold text-[#1C1C1C]">
            Anybody can use Voxscribe
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-[56px] items-center">
            <div className="flex flex-col items-start gap-3 lg:gap-6 w-full lg:w-[278px]">
              <img src={Monitor} alt="Monitor" className="w-6 h-6" />
              <p className="text-[#1C1C1C] font-bold font-satoshi text-[20px] lg:text-[24px]">
                Creators
              </p>
              <p className="font-normal font-satoshi text-[#363637]">
                Instantly turn written content into engaging voiceovers for
                YouTube, social media, or podcast intros.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 lg:gap-6 w-full lg:w-[278px]">
              <img src={Chart} alt="Chart" className="w-6 h-6" />
              <p className="text-[#1C1C1C] font-bold font-satoshi text-[20px] lg:text-[24px]">
                Educators
              </p>
              <p className="font-normal font-satoshi text-[#363637]">
                Enhance lessons by converting educational material into
                multilingual audio, perfect for global classrooms.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 lg:gap-6 w-full lg:w-[278px]">
              <img src={Data} alt="Data" className="w-6 h-6" />
              <p className="text-[#1C1C1C] font-bold font-satoshi text-[20px] lg:text-[24px]">
                Businesses
              </p>
              <p className="font-normal font-satoshi text-[#363637]">
                Add professional narration to presentations, product demos, and
                customer service interactions.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 lg:gap-6 w-full lg:w-[278px]">
              <img src={Reputation} alt="Reputation" className="w-6 h-6" />
              <p className="text-[#1C1C1C] font-bold font-satoshi text-[20px] lg:text-[24px]">
                Publishers
              </p>
              <p className="font-normal font-satoshi text-[#363637]">
                Turn your books and articles into captivating audiobooks, or
                offer narrated versions for accessibility.
              </p>
            </div>
          </div>
        </div>

        <div className="w-10/12 mx-auto flex flex-col gap-[32px] ">
          <p className="text-[#1C1C1C] font-bold font-satoshi text-[28px] lg:text-[48px]">
            Why choose Voxscribe?
          </p>
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-[91px] ">
            <img
              src={Shake}
              alt="Shake"
              className="w-full h-[340px] lg:hidden"
            />
            <div className="flex flex-col gap-[48px] w-full lg:w-6/12">
              <div className="flex gap-6 flex-col">
                <img src={Monitor} alt="Monitor" className="w-6 h-6" />
                <p className="text-[#1C1C1C] font-satoshi font-bold text-[24px]">
                  Lifelike Speech
                </p>
                <p className="font-medium font-satoshi text-base text-[#363637]">
                  Create natural, human-like audio that sounds as if it were
                  spoken by a real person, complete with emotions and
                  inflections.
                </p>
              </div>
              <div className="flex gap-6 flex-col">
                <img src={Chart} alt="Chart" className="w-6 h-6" />
                <p className="text-[#1C1C1C] font-satoshi font-bold text-[24px]">
                  Instant Voice Creation
                </p>
                <p className="font-medium font-satoshi text-base text-[#363637]">
                  Upload text, select your preferred voice, and generate
                  professional-quality speech in seconds.
                </p>
              </div>
              <div className="flex gap-6 flex-col">
                <img src={Data} alt="Data" className="w-6 h-6" />
                <p className="text-[#1C1C1C] font-satoshi font-bold text-[24px]">
                  Customizable Voices{" "}
                </p>
                <p className="font-medium font-satoshi text-base text-[#363637]">
                  Choose the tone, pace, and style that perfectly fits your
                  message, ensuring it hits just the right note.
                </p>
              </div>
            </div>
            <img
              src={Shake}
              alt="Shake"
              className="w-[562px] h-[572px] hidden lg:flex"
            />
          </div>
        </div>
      </div>

      <div className="w-full bg-[#FFF7F2] relative flex justify-between h-auto">
        <img
          src={Notification}
          alt="NotificationB"
          className="w-[350px] hidden lg:block absolute top-0 "
        />
        <img
          src={Time}
          alt="Time"
          className="w-[172px] absolute -left-10 top-0 lg:hidden h-[82px]"
        />
        <div className="flex flex-col gap-8  w-full lg:w-8/12 mx-5 lg:mx-auto my-[60px] items-center">
          <img
            src={Insights}
            alt="Insights"
            className="w-[159px] hidden lg:flex h-[59px]"
          />

          <p className="lg:w-6/12 font-satoshi mt-5 lg:mt-0 font-bold text-[20px] lg:text-[24px] text-center">
            Whether you’re educating, entertaining, or promoting, VoxSpeak helps
            you craft a voice that truly connects.
          </p>
          <button
            type="button"
            className="w-[303px] bg-[#17053E] p-4 flex items-center justify-center rounded-3xl"
            // onClick={() => setOpen(true)}
          >
            <p className="font-satoshi text-[20px] font-medium text-[#fff]">
              Request free consultation
            </p>
          </button>
          <img
            src={Time}
            alt="Time"
            className="w-[172px] hidden lg:flex h-[82px]"
          />
        </div>
        <img
          src={NotificationB}
          alt="Notification"
          className="w-[359px] hidden lg:block absolute bottom-0 right-0"
        />
      </div>
    </div>
  );
};

export default Scribe;

{
  /* <div className='flex flex-col xl:flex-row justify-between px-[20px] xl:px-[100px]'>
<div className='flex flex-col gap-[48px]'>

    <div className='flex xl:hidden flex-col mt-10 xl:mt-0 gap-[32px]'>
        <div className='flex flex-col  xl:w-[600px] gap-2 xl:p-4'>
            <p className='text-[#17053E] text-[22px] font-poppins font-medium'>Get Audio Transcription Now</p>
        </div>
        
        <div className='flex flex-col items-center gap-4'>
            {isRecording ? (
            <button 
                className='w-full xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' 
                onClick={stopMicrophone}
            >
                <p className='text-[#fff] '>Stop recording</p>
            </button>
            ) : (
            <button 
                className='w-full xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' 
                onClick={startMicrophone}
            >
                <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Voxscribe"}</p>
            </button>
            )}
        </div>
        
        <textarea
            type="text"
            value={transcript}
            className='w-full border border-[#ccc] h-[250px] p-4 font-poppins rounded-lg'
            readOnly
        ></textarea>
    </div>

    <p className='w-full text-center xl:text-left xl:w-[450px] text-[#17053E] text-[28px]'>VoxScribe (Live Transcription and Press Release Automation Tool): </p>
    
    <p className='font-medium text-[#8F899C]  xl:w-[458px]'>
        Tired of tedious manual transcription and struggling to craft impactful press releases? 
        VoxScribe is your one-stop solution for turning spoken words into valuable content, instantly. 
        It offers a near-zero-percent error rate.
    </p>

    <div className='flex flex-col gap-4 xl:w-[458px]'>
        <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
        <p className='text-[#17053E] text-[24px]'>Live Transcription:</p>
        <p className='font-medium text-[#8F899C]'>
            Capture every word of interviews, meetings, events, and press conferences in 
            real-time with unparalleled accuracy. 
        </p>
    </div>

    <div className='flex flex-col gap-4 xl:w-[458px]'>
        <img src={Chart} alt='Chart' className='w-6 h-6'/>
        <p className='text-[#17053E] text-[24px]'>Multi-Language Support: </p>
        <p className='font-medium text-[#8F899C]'>
            Transcribe conversations in multiple languages effortlessly, removing communication barriers. 
        </p>
    </div>

    <div className='flex flex-col gap-4 xl:w-[458px]'>
        <img src={Data} alt='Data' className='w-6 h-6'/>
        <p className='text-[#17053E] text-[24px]'>Speaker Identification: </p>
        <p className='font-medium text-[#8F899C]'>
            Easily distinguish between different speakers for clear and organized transcripts. 
        </p>
    </div>

    <div className='flex flex-col gap-4 xl:w-[458px]'>
        <img src={Reputation} alt='Monitor' className='w-6 h-6'/>
        <p className='text-[#17053E] text-[24px]'>Keyword Highlighting:</p>
        <p className='font-medium text-[#8F899C]'>
            Aptly identify key topics and themes within your transcripts to 
            save time and to help focus on your analysis.
        </p>
    </div>

</div>

<div className='xl:flex flex-col mt-10 hidden xl:mt-0 gap-[32px]'>
    <div className='flex flex-col  xl:w-[600px] gap-2 '>
        <p className='text-[#17053E] text-[22px] font-poppins font-medium'>Get Audio Transcription Now</p>
    </div>

    <div className='flex flex-col items-center gap-4'>
        {isRecording ? (
            <button 
                className='w-full text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' 
                onClick={stopMicrophone}
            >
                <p className='text-[#fff] '>Stop recording</p>
            </button>
        ) : (
            <button 
                className='w-full text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' 
                onClick={startMicrophone}
            >
                <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Voxscribe"}</p>
            </button>
        )}
    </div>

    <textarea
        type="text"
        value={transcript}
        className='w-full border border-[#ccc] h-[250px] p-4 font-poppins rounded-lg'
        readOnly
    ></textarea>
</div>

</div>


<div className='w-full flex flex-col xl:flex-row items-center mb-10 justify-between py-10 xl:py-0 xl:h-[480px] mt-[103px] px-[20px] xl:px-[100px] bg-[#FFF7F2]'>
<div className='flex flex-col gap-[6px]'>
    <p className=' flex flex-col gap-4  xl:w-[673px]'>
    <p className='text-2xl xl:text-[30px] text-[#17053E] font-semibold'> How PR Pros Benefit</p>
    <p className='text-base'><span className='font-medium'>Crisis Management:</span> Quickly gauge public sentiment in a crisis.</p>
    <p className='text-base'><span className='font-medium'>Media Monitoring:</span> Track the impact of press coverage and competitor activity.</p>
    <p className='text-base'><span className='font-medium'>Campaign Evaluation:</span> Measure the emotional resonance of your messaging.</p>
    <p className='text-base'><span className='font-medium'>Stakeholder Insights:</span> Understand the true needs and concerns of your audience.</p>
    </p>
    <button type='button' className='xl:w-[371px] mt-2 rounded-lg bg-[#17053E] p-4' onClick={() => setOpenForm(true)}>
        <p className='text-[#fff]'>Request Free Consultation</p>
    </button>
</div>
<div className='flex-col relative hidden xl:flex'>
    <img src={Time} alt='Time' className='w-[208px]  absolute -top-24 '/>
    <img src={Notification} alt='Notification' className='w-[444px] left-14 -top-16 absolute ' />
    <img src={Insights} alt='Insights' className='w-[193px]  top-20 z-40 absolute'/>
    <img src={NotificationB} alt='NotificationB' className='w-[446px] left-14 top-20 relative  ' />
</div>
</div> */
}
