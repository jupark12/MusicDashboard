import React, { useContext, useRef, useEffect, useState } from "react";
import "./Summary.scss";
import { GlobalContext } from "../../util/GlobalState";
import WaveSurfer from 'wavesurfer.js';
import { FaPlay, FaPause, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Summary = ({ cards }) => {
  
  const { currentIndex, setCurrentIndex } = useContext(GlobalContext);
  const { setTotalRotation } = useContext(GlobalContext);
  const currentIndexRef = useRef(currentIndex);
  const currentRenderCount = useRef(0);
  currentRenderCount.current += 1;
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }

    if (!cards[currentIndex].audio) return;

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

    wavesurferRef.current.load(cards[currentIndex].audio);
    console.log(currentIndexRef.current, currentIndex, 'bruh', wavesurferRef.current)
    if (currentRenderCount.current > 1) {
      wavesurferRef.current.play();
    }

    return () => {
      if (wavesurferRef.current) {
        console.log('destroying')
        wavesurferRef.current.destroy();
      }
    };
  }, [currentIndex]);

  const handlePlayPause = () => {
    const currentWavesurfer = wavesurferRef.current;
    console.log('this ting')
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
    const currentWavesurfer = wavesurferRef.current;
    currentWavesurfer.seekTo(0);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    setCurrentIndex(currentIndex => currentIndex === 0 ? cards.length - 1 : currentIndex - 1);
    setTotalRotation(prevRotation => prevRotation + (360 / cards.length));
    const currentWavesurfer = wavesurferRef.current;
    currentWavesurfer.seekTo(0);
    setIsPlaying(true);
  };

  return (
    <div className="Summary-container fixed top-[56px] w-half h-full flex flex-col overflow-hidden items-start pl-[40px] pb-20">
      {cards[currentIndex].date && <p>{cards[currentIndex].date}</p>}
      
      <div className="fixed bottom-0 w-full flex justify-center pb-20 left-1 gap-3">
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
