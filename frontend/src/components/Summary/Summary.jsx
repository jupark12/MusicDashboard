import React, { useContext, useRef, useEffect, useState } from "react";
import "./Summary.scss";
import { GlobalContext } from "../../util/GlobalState";
import WaveSurfer from "wavesurfer.js";
import {
  FaPlay,
  FaPause,
  FaChevronLeft,
  FaChevronRight,
  FaRandom,
} from "react-icons/fa";
import Tracklist from "../Tracklist/Tracklist";
import { throttle } from "lodash";

const Summary = () => {
  const {
    cards,
    setCards,
    currentIndex,
    setCurrentIndex,
    setTotalRotation,
    isDelete,
    setIsDelete,
    isShuffle,
    setIsShuffle,
    isPlaying,
    setIsPlaying,
    isRecording,
    isSameAudio,
    setIsSameAudio,
    editMode,
    ballColor,
    setBallColor,
    gradientColors1,
    gradientColors2,
    setGradientColors1,
    setGradientColors2,
  } = useContext(GlobalContext);
  const currentRenderCount = useRef(0);
  const isSameAudioRef = useRef(isSameAudio);
  currentRenderCount.current += 1;
  const waveformRef = useRef();
  const wavesurferRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    isSameAudioRef.current = isSameAudio;
  }, [currentIndex, cards]);

  const createWavesurfer = (tempCards, index) => {
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "rgb(0, 0 , 0)",
      progressColor: "rgb(255, 255, 255)",
      cursorWidth: 0,
      height: 100,
      renderFunction: (channels, ctx) => {
        const { width, height } = ctx.canvas;
        const scale = channels[0].length / width;
        const step = 8;
        ctx.translate(0, height / 2);
        ctx.strokeStyle = ctx.fillStyle;
        ctx.beginPath();
        for (let i = 0; i < width; i += step * 2.5) {
          const index = Math.floor(i * scale);
          const value = Math.abs(channels[0][index]);
          let x = i;
          let y = (value * height) / 2;
          ctx.moveTo(x, 0);
          ctx.lineTo(x, y);
          ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, true);
          ctx.lineTo(x + step, 0);
          x += step;
          y = -y;
          ctx.moveTo(x, 0);
          ctx.lineTo(x, y);
          ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, false);
          ctx.lineTo(x + step, 0);
        }
        ctx.stroke();
        ctx.closePath();
      },
    });

    wavesurferRef.current.load(tempCards[index].audio);

    if (currentRenderCount.current > 1 && !editMode) {
      wavesurferRef.current.play();
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    console.log(wavesurferRef.current, currentIndex, isSameAudioRef.current); // Debugging
    if (wavesurferRef.current && !isSameAudioRef.current) {
      console.log("destroying");
      wavesurferRef.current.destroy();
    }
    if (!cards[currentIndex]?.audio || !waveformRef.current || isSameAudio)
      return;
    console.log("creating");
    createWavesurfer(cards, currentIndex);
  }, [currentIndex, cards]);

  const handlePlayPause = () => {
    const currentWavesurfer = wavesurferRef.current;
    if (currentWavesurfer.isPlaying()) {
      currentWavesurfer.pause();
      setIsPlaying(false);
    } else {
      currentWavesurfer.play();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (isShuffle) {
      setCurrentIndex((currentIndex) => {
        const randomIndex = Math.floor(Math.random() * cards.length);
        setIsSameAudio(cards[randomIndex].id == cards[currentIndex].id);
        setTotalRotation((prevRotation) => {
          const newRotation =
            randomIndex >= currentIndex
              ? prevRotation -
                (360 / cards.length) * (randomIndex - currentIndex)
              : prevRotation +
                (360 / cards.length) * (currentIndex - randomIndex);
          return newRotation;
        });

        setIsPlaying(true);
        return randomIndex;
      });
    } else {
      setCurrentIndex((currentIndex) => {
        const newIndex =
          currentIndex === cards.length - 1 ? 0 : currentIndex + 1;
        setIsSameAudio(cards[newIndex].id == cards[currentIndex].id);
        return newIndex;
      });
      setTotalRotation((prevRotation) => prevRotation - 360 / cards.length);
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    if (isShuffle) {
      setCurrentIndex((currentIndex) => {
        const randomIndex = Math.floor(Math.random() * cards.length);
        setIsSameAudio(cards[randomIndex].id == cards[currentIndex].id);
        setTotalRotation((prevRotation) => {
          const newRotation =
            randomIndex >= currentIndex
              ? prevRotation -
                (360 / cards.length) * (randomIndex - currentIndex)
              : prevRotation +
                (360 / cards.length) * (currentIndex - randomIndex);
          return newRotation;
        });

        setIsPlaying(true);
        return randomIndex;
      });
    } else {
      setCurrentIndex((currentIndex) => {
        const newIndex =
          currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
        setIsSameAudio(cards[newIndex].id == cards[currentIndex].id);
        return newIndex;
      });
      setTotalRotation((prevRotation) => prevRotation + 360 / cards.length);
      setIsPlaying(true);
    }
  };

  // On end of audio set isPlaying to false
  useEffect(() => {
    const currentWavesurfer = wavesurferRef.current;
    if (currentWavesurfer) {
      currentWavesurfer.on("finish", () => {
        handleNext();
      });
      currentWavesurfer.on(
        "audioprocess",
        throttle(() => {
          setCurrentTime(currentWavesurfer.getCurrentTime());
        }, 1000)
      );
    }
  }, [currentIndex, cards]);

  // Stop the audio when recording
  useEffect(() => {
    if (isRecording) {
      wavesurferRef.current.stop();
      setIsPlaying(false);
    }
  }, [isRecording]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="Summary-container fixed top-[56px] h-full flex flex-col overflow-hidden items-start pl-[40px] pb-20 w-[30%]">
      <Tracklist />

      <div
        className={`mt-8
          ${
            editMode
              ? "Summary-colorPicker  shadow-teal-300 shadow-2xl"
              : "Summary-info"
          }`}
      >
        {editMode ? (
          <div className="">
            <div className="flex gap-4">
              <p className="flex flex-col">
                Ball Color:{" "}
                <span className="text-black">{ballColor.toUpperCase()}</span>
              </p>
              <input
                type="color"
                value={ballColor}
                onChange={(e) => setBallColor(e.target.value)}
                className="cursor-pointer"
              />
            </div>
            <div className="flex gap-4">
              <p className="flex flex-col">
                Background Colors:{" "}
                <div className="flex gap-4">
                  <span className="text-black">
                    {gradientColors1.toUpperCase()}
                  </span>
                  <span className="text-black">
                    {gradientColors2.toUpperCase()}
                  </span>
                </div>
              </p>
              <input
                type="color"
                value={gradientColors1}
                onChange={(e) => setGradientColors1(e.target.value)}
                className="cursor-pointer"
              />
              <input
                type="color"
                value={gradientColors2}
                onChange={(e) => setGradientColors2(e.target.value)}
                className="cursor-pointer"
              />
            </div>
          </div>
        ) : (
          <div className="">
            <div className="flex gap-2">
              Timestamp: <p className="text-white">{formatTime(currentTime)}</p>
            </div>
            {cards[currentIndex]?.date && (
              <p className="text-white">
                File Created: {cards[currentIndex].date}
              </p>
            )}
            <p className="text-white">
              Notes: {cards[currentIndex]?.notes || "No notes available."}
            </p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-[180px] pb-5 w-[50vw] justify-end flex">
        <div className="flex flex-col items-center">
          <div ref={waveformRef} className="min-w-[375px]" />
          <div className="flex gap-3">
            <button
              onClick={handlePrevious}
              className="Button-controls border-2 p-4 rounded-full border-black"
            >
              <FaChevronLeft size={24} />
            </button>
            <button
              onClick={handlePlayPause}
              className="Button-controls border-2 p-4 rounded-full border-black"
            >
              {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
            </button>
            <button
              onClick={handleNext}
              className="Button-controls border-2 p-4 rounded-full border-black"
            >
              <FaChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
