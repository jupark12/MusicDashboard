import React, { useState, useContext } from "react";
import UploadModal from "../Modal/UploadModal";
import Recorder from "../Recorder/Recorder";
import { GlobalContext } from "../../util/GlobalState";
import { FaPlusCircle, FaMicrophone } from "react-icons/fa";
import "./Header.scss";

const Header = () => {
  console.log("Header.js");

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isRecorderModalOpen, setIsRecorderModalOpen] = useState(false);
  const { editMode, setEditMode, setIsDelete } = useContext(GlobalContext);

  const openModal = () => setIsUpdateModalOpen(true);
  const closeModal = () => setIsUpdateModalOpen(false);

  const openRecorderModel = () =>
    !isUpdateModalOpen ? setIsRecorderModalOpen(true) : null;
  const closeRecorderModel = () => setIsRecorderModalOpen(false);

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <div className="Header bg-transparent flex py-4 fixed w-full">
      <h2 className="pl-10 text-white font-bold text-[24px]">Music Wheel</h2>

      <div className="flex ml-auto w-min">
        {!isRecorderModalOpen && (
          <button
            onClick={isUpdateModalOpen ? closeModal : openModal}
            className="text-white mr-10"
          >
            <FaPlusCircle size={32} className="Icon-plus" />
          </button>
        )}

        {!isUpdateModalOpen && (
          <button
            onClick={
              isRecorderModalOpen ? closeRecorderModel : openRecorderModel
            }
            className="ml-auto mr-10 text-white"
          >
            <FaMicrophone size={32} className="Icon-plus" />
          </button>
        )}
      </div>

      {isUpdateModalOpen && <UploadModal closeModal={closeModal} />}
      {isRecorderModalOpen && <Recorder closeModal={closeRecorderModel} />}
      <button
        onClick={handleEditMode}
        className={`Button ${
          editMode ? "Button-editStop" : "Button-edit"
        } ml-auto mr-10 text-white w-[100px]`}
      >
        {editMode ? "Stop Edit" : "Edit"}
      </button>
    </div>
  );
};

export default Header;
