import React, { useContext, useRef, useEffect, useState } from "react";
import "./Summary.scss";
import { GlobalContext } from "../../util/GlobalState";
import WaveSurfer from 'wavesurfer.js';
import { FaPlay, FaPause, FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";
import Tracklist from "../Tracklist/Tracklist";
import { throttle } from 'lodash';

const Summary = () => {
  console.log("Summary.js");
  const { cards, setCards } = useContext(GlobalContext);
  const { currentIndex, setCurrentIndex } = useContext(GlobalContext);
  const { setTotalRotation } = useContext(GlobalContext);
  const { isDelete, setIsDelete } = useContext(GlobalContext);
  const { editMode } = useContext(GlobalContext);
  const currentIndexRef = useRef(currentIndex);
  const currentRenderCount = useRef(0);
  currentRenderCount.current += 1;
  const waveformRef = useRef();
  const wavesurferRef = useRef(null);
  const { isPlaying, setIsPlaying } = useContext(GlobalContext);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex, cards]);

  const createWavesurfer = (tempCards, index) => {
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'rgb(0, 0 , 0)',
      progressColor: 'rgb(255, 255, 255)',
      cursorWidth: 0,
      renderFunction: (channels, ctx) => {
        const { width, height } = ctx.canvas;
        const scale = channels[0].length / width;
        const step = 5;
        ctx.translate(0, height / 2);
        ctx.strokeStyle = ctx.fillStyle;
        ctx.beginPath();
        for (let i = 0; i < width; i += step * 2) {
          const index = Math.floor(i * scale);
          const value = Math.abs(channels[0][index]);
          let x = i;
          let y = value * height;
          ctx.moveTo(x, 0);
          ctx.lineTo(x, y);
          ctx.arc(x + step / 10, y, step / 10, Math.PI, 0, true);
          ctx.lineTo(x + step, 0);
          x += step;
          y = -y;
          ctx.moveTo(x, 0);
          ctx.lineTo(x, y);
          ctx.arc(x + step / 10, y, step / 10, Math.PI, 0, false);
          ctx.lineTo(x + step, 0);
        }
        ctx.stroke();
        ctx.closePath();
      },
    });

    wavesurferRef.current.load(tempCards[index].audio);
    if (currentRenderCount.current > 1 && !isDelete) {
      wavesurferRef.current.play();
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (!cards[currentIndex]?.audio || !waveformRef.current) return;

    console.log('creating')
    createWavesurfer(cards, currentIndex);

    return () => {
      if (wavesurferRef.current) {
        console.log('destroying')
        wavesurferRef.current.destroy();
      }
    };
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
    setCurrentIndex(currentIndex => currentIndex === cards.length - 1 ? 0 : currentIndex + 1);
    setTotalRotation(prevRotation => prevRotation - (360 / cards.length));
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    setCurrentIndex(currentIndex => currentIndex === 0 ? cards.length - 1 : currentIndex - 1);
    setTotalRotation(prevRotation => prevRotation + (360 / cards.length));
    setIsPlaying(true);
  };

  // On end of audio set isPlaying to false
  useEffect(() => {
    const currentWavesurfer = wavesurferRef.current;
    if (currentWavesurfer) {
      currentWavesurfer.on('finish', () => {
        handleNext();
      });
      currentWavesurfer.on('audioprocess', throttle(() => {
        setCurrentTime(currentWavesurfer.getCurrentTime());
      }, 1000));
    }
  }, [currentIndex, cards]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="Summary-container fixed top-[56px] w-half h-full flex flex-col overflow-hidden items-start pl-[40px] pb-20">
      <div>Timestamp: {formatTime(currentTime)}</div>
      {cards[currentIndex]?.date && <p>File Created: {cards[currentIndex].date}</p>}
      <Tracklist />
      <div className="fixed bottom-0 left-[-40px] right-[40px] pb-20 gap-3 w-full">
        <div className="flex flex-col items-center">
          <div ref={waveformRef} className="min-w-[375px]" />
          <div className="flex gap-3">
            <button onClick={handlePrevious} className="border-2 p-4 rounded-full border-black">
              <FaChevronLeft size={24} />
            </button>
            <button onClick={handlePlayPause} className="border-2 p-4 rounded-full border-black">
              {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
            </button>
            <button onClick={handleNext} className="border-2 p-4 rounded-full border-black">
              <FaChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
