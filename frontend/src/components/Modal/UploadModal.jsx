import React, { useContext, useState } from "react";
import Moment from "react-moment";
import { GlobalContext } from "../../util/GlobalState";
import { useDropzone } from "react-dropzone";
import Recorder from "../Recorder/Recorder";
import {
  FaChevronLeft,
  FaChevronRight,
  FaMusic,
  FaCamera,
} from "react-icons/fa";
import "./UploadModal.scss";

const UploadModal = ({ closeModal }) => {
  Moment.globalFormat = "MM/DD/YY";

  const { cards, setCards } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    cover: "",
    title: "",
    audio: "",
  });
  const [droppedAudioFile, setDroppedAudioFile] = useState(""); // Updated state variable name
  const [droppedImageFile, setDroppedImageFile] = useState("");
  const [currentSlide, setCurrentSlide] = useState(1); // Track the current slide
  const [errorMessage, setErrorMessage] = useState("");
  const { currentIndex, setCurrentIndex } = useContext(GlobalContext);
  const { totalRotation, setTotalRotation } = useContext(GlobalContext);

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    if (acceptedFiles.length === 0) return;
    console.log(acceptedFiles);

    const audioFile = acceptedFiles.find((file) => file.type.includes("audio"));

    if (audioFile) {
      console.log(audioFile);
      setFormData((prevData) => ({
        ...prevData,
        audio: URL.createObjectURL(audioFile),
        date: <Moment>{audioFile.lastModified}</Moment>,
        id: cards.length + 1,
      }));
      setDroppedAudioFile(audioFile.name);
      setErrorMessage(""); // Clear error message on successful drop
    }

    const imageFile = acceptedFiles.find((file) => file.type.includes("image"));

    if (imageFile) {
      setFormData((prevData) => ({
        ...prevData,
        cover: URL.createObjectURL(imageFile),
      }));
      setDroppedImageFile(imageFile.name);
    }
  };

  const addCard = (newCard) => {
    setCards((cards) => {
      const updatedCards = [...cards, newCard];
      setCurrentIndex(updatedCards.length - 1); // Update the current index to the new card
      setTotalRotation((prevRotation) => {
        console.log(prevRotation, updatedCards.length, currentIndex);
        const newRotation = 270 + 360 / updatedCards.length;
        return newRotation;
      });
      return updatedCards;
    });
    // Set the current index to the new card
    closeModal();
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ["audio/*"],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addCard(formData);
  };

  const goToNextSlide = (event) => {
    event.preventDefault();
    if (droppedAudioFile) {
      setCurrentSlide((slide) => slide + 1);
    } else {
      setCurrentSlide(1);
      setErrorMessage("Please upload an audio file before proceeding.");
    }
  };

  const goToPreviousSlide = (event) => {
    event.preventDefault();
    setCurrentSlide((slide) => (slide - 1 >= 0 ? slide - 1 : 1));
  };

  return (
    <div className="UploadModal">
      <div className="UploadModal-content rounded-md text-[#696b5d]">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        {currentSlide === 1 ? ( // First slide: Audio file selection
          <div className="flex flex-col items-center h-full">
            <h2 className="pb-8">Add New Song</h2>
            <form className="flex flex-col items-center w-full h-full">
              <div
                {...getRootProps({
                  className:
                    "dropzone cursor-pointer h-32 w-32 p-2 flex items-center",
                })}
              >
                <input {...getInputProps()} />
                <FaMusic size={32} className="flex justify-center w-full" />
              </div>
              {droppedAudioFile && (
                <p className="mt-8 text-center">
                  Audio file selected: {droppedAudioFile}
                </p>
              )}
              <div className="ml-auto mt-auto">
                <button className="mt-auto" onClick={goToNextSlide}>
                  <FaChevronRight size={16} />
                </button>
              </div>
            </form>
          </div>
        ) : (
          // Second slide: Display current content
          <div className="flex flex-col items-center h-full">
            <h2 className="pb-8">Add New Song</h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center w-full h-full"
            >
              {formData.cover ? (
                <img
                  src={formData.cover}
                  alt="Cover"
                  className="h-32 w-32 mb-4 rounded-full"
                />
              ) : (
                <div
                  {...getRootProps({
                    className:
                      "dropzone cursor-pointer rounded-full h-32 w-32 p-2 flex items-center",
                  })}
                >
                  <input {...getInputProps()} />
                  <FaCamera size={32} className="flex justify-center w-full" />
                </div>
              )}
              <input
                className="mt-8 border-b-2 border-gray-300 p-2 rounded-sm"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Song Title"
              />
              <div className="flex justify-between w-full mt-auto">
                <button
                  className="mt-4"
                  type="button"
                  onClick={goToPreviousSlide}
                >
                  <FaChevronLeft size={16} />
                </button>
                <button className="mt-4 ml-auto" type="submit">
                  Add Song
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="error w-full justify-center flex mt-4">
        <p className={`error-text ${errorMessage ? "visible" : ""}`}>
          {errorMessage}
        </p>
      </div>
    </div>
  );
};

export default UploadModal;
