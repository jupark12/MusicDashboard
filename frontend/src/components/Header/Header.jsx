import React, { useState, useContext } from "react";
import UploadModal from "../Modal/UploadModal";
import { GlobalContext } from "../../util/GlobalState"; 
import { FaPlusCircle, FaEdit } from "react-icons/fa";
import "./Header.scss";

const Header = () => {
  console.log("Header.js");
  
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { editMode, setEditMode } = useContext(GlobalContext);

  const openModal = () => setIsUpdateModalOpen(true);
  const closeModal = () => setIsUpdateModalOpen(false);

  const handleEditMode = () => setEditMode(prev => !prev);

  return(
    <div className="Header bg-transparent flex py-4 fixed w-full">
      <h2 className="pl-10 text-white font-bold text-[24px]">Music Wheel</h2>

      <button onClick={openModal} className="ml-auto mr-10 text-white">
        <FaPlusCircle size={32} className="Icon-plus"/>
      </button>
      {isUpdateModalOpen && <UploadModal closeModal={closeModal} />}
      <button onClick={handleEditMode} className={`Button ${editMode ? 'Button-editStop' : 'Button-edit'} ml-auto mr-10 text-white w-[100px]`}>
        {editMode ? "Stop Edit" : "Edit"}
      </button>
    </div>
  )
};

export default Header;