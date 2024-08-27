import React, { useState, useContext } from "react";
import UploadModal from "../Modal/UploadModal";
import Recorder from "../Recorder/Recorder";
import { GlobalContext } from "../../util/GlobalState";
import { FaPlusCircle, FaMicrophone, FaRandom } from "react-icons/fa";
import "./Header.scss";

const Header = () => {
  console.log("Header.js");

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isRecorderModalOpen, setIsRecorderModalOpen] = useState(false);
  const { editMode, setEditMode, cards, setIsShuffle, isShuffle } =
    useContext(GlobalContext);

  const openModal = () =>
    !isRecorderModalOpen ? setIsUpdateModalOpen(true) : null;
  const closeModal = () => setIsUpdateModalOpen(false);

  const openRecorderModel = () =>
    !isUpdateModalOpen ? setIsRecorderModalOpen(true) : null;
  const closeRecorderModel = () => setIsRecorderModalOpen(false);

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleShuffle = () => {
    setIsShuffle((prev) => !prev);
  };

  return (
    <div className="Header bg-transparent flex justify-center py-4 px-10 fixed w-full">
      <span className="text-white font-bold text-[24px] flex items-center gap-4">
        <h1>Music Wheel</h1>
        {cards?.length > 0 && (
          <button
            className={`Button-shuffle ${isShuffle ? "Button-shuffle-on" : ""}`}
            onClick={handleShuffle}
          >
            <FaRandom size={18} className="" />
          </button>
        )}
      </span>

      <div className="flex ml-auto w-min">
        <button
          onClick={isUpdateModalOpen ? closeModal : openModal}
          className={`text-white mr-10 ${
            isRecorderModalOpen ? "Icon-faded" : "Icon-plus"
          }`}
        >
          <FaPlusCircle size={32} />
        </button>

        <button
          onClick={isRecorderModalOpen ? closeRecorderModel : openRecorderModel}
          className={`text-white mr-10 ${
            isUpdateModalOpen ? "Icon-faded" : "Icon-plus"
          }`}
        >
          <FaMicrophone size={32} />
        </button>
      </div>

      {isUpdateModalOpen && <UploadModal closeModal={closeModal} />}
      {isRecorderModalOpen && <Recorder closeModal={closeRecorderModel} />}
      <div className="w-[167px] ml-auto flex justify-end">
        <button
          onClick={handleEditMode}
          className={`Button ${
            editMode ? "Button-editStop" : "Button-edit"
          } px-8  py-2 text-white`}
        >
          {editMode ? "Stop Edit" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default Header;
