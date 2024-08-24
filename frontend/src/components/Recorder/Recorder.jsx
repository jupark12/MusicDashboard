import React, { useContext, useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";
import { GlobalContext } from "../../util/GlobalState";
import "./Recorder.scss";

const Recorder = ({ closeModal }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const { isRecording, setIsRecording } = useContext(GlobalContext);
  const [recordedAudioURL, setRecordedAudioURL] = useState("");

  useEffect(() => {
    // Initialize WaveSurfer
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#D9DCFF",
      progressColor: "#4353FF",
      plugins: [
        RecordPlugin.create({
          recordingMimeType: "audio/mp3",
        }),
      ],
    });

    // Set up event listeners for recording
    wavesurferRef.current.plugins[0].on("record-end", (blob) => {
      const url = URL.createObjectURL(blob);
      setRecordedAudioURL(url);
    });

    return () => {
      wavesurferRef.current.destroy();
    };
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    console.log(wavesurferRef.current.plugins[0]);
    wavesurferRef.current.plugins[0].startRecording();
  };

  const stopRecording = () => {
    setIsRecording(false);
    wavesurferRef.current.plugins[0].stopRecording();
  };

  return (
    <div className="Recorder">
      <div className="Recorder-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <div ref={waveformRef} id="waveform"></div>
        <button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>

        {recordedAudioURL && (
          <div>
            <h3>Recorded Audio:</h3>
            <audio controls src={recordedAudioURL} />
            <a href={recordedAudioURL} download="recording.wav">
              Download Recording
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recorder;
