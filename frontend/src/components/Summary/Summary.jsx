import React, { useContext, useRef, useEffect, useState } from "react";
import "./Summary.scss";
import { GlobalContext } from "../../util/GlobalState";
import WaveSurfer from 'wavesurfer.js';
import { FaPlay, FaPause } from "react-icons/fa";

const Summary = ({ cards }) => {
  const { currentIndex } = useContext(GlobalContext);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);
  const waveformRefs = useRef(cards.map(() => React.createRef()));
  const wavesurferRefs = useRef(cards.map(() => null));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    cards.forEach((card, index) => {
      if (!card.audio) return;

      if (wavesurferRefs.current[index]) {
        wavesurferRefs.current[index].destroy();
      }

      wavesurferRefs.current[index] = WaveSurfer.create({
        container: waveformRefs.current[index].current,
        waveColor: 'rgb(200, 0, 200)',
        progressColor: 'rgb(100, 0, 100)',
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

      wavesurferRefs.current[index].load(card.audio);
    });

    return () => {
      wavesurferRefs.current.forEach(wavesurfer => {
        if (wavesurfer) {
          wavesurfer.destroy();
        }
      });
    };
  }, [cards]);

  const handlePlayPause = () => {
    const currentWavesurfer = wavesurferRefs.current[currentIndex];
    if (currentWavesurfer.isPlaying()) {
      currentWavesurfer.pause();
      setIsPlaying(false);
    } else {
      currentWavesurfer.play();
      setIsPlaying(true);
    }
  };

  function handleKeyPress(event) {
    const currentIndex = currentIndexRef.current;
    if (event.key === "ArrowUp") {
      const currentWavesurfer = wavesurferRefs.current[currentIndex];
      const nextIndex = currentIndex === cards.length - 1 ? 0 : currentIndex + 1;
      const nextWavesurfer = wavesurferRefs.current[nextIndex];
      currentWavesurfer.pause();
      currentWavesurfer.seekTo(0);
      nextWavesurfer.play();
    } else if (event.key === "ArrowDown") {
      const currentWavesurfer = wavesurferRefs.current[currentIndex];
      const prevIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
      const prevWavesurfer = wavesurferRefs.current[prevIndex];
      currentWavesurfer.pause();
      currentWavesurfer.seekTo(0);
      prevWavesurfer.play();
    }
  }

  useEffect(() => {
      window.addEventListener("keydown", handleKeyPress);
      return () => {
          window.removeEventListener("keydown", handleKeyPress);
      };
  }, []);

  return (
    <div className="Summary-container fixed top-[56px] w-half h-full flex flex-col overflow-hidden items-start pl-[40px] pb-20">
      {cards.map((card, index) => (
        <div key={index} className={`Summary ${currentIndex === index ? 'visible' : 'hidden'}`}>
          {card.date && <p>{card.date}</p>}
          <div ref={waveformRefs.current[index]} className="min-w-[375px]" />
        </div>
      ))}
      <div className="fixed bottom-0 w-full flex justify-center pb-20 left-1">
        <button onClick={handlePlayPause} className="border-2 p-4 rounded-full border-black">
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
      </div>
    </div>
  );
};

export default Summary;