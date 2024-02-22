import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Modal from "./Modal";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <nav
      className={`${
        isMenuOpen ? "bg-gray-200" : "bg-gray-200"
      } p-4 font-semibold ${isModalOpen ? "bg-opacity-50" : ""}`}
    >
      <div className="md:flex justify-around items-center">
        <div className="text-[2rem] flex justify-around items-center relative">
          <span className="text-red-500 animate-fire">AcademicNest</span>
          <div onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
        <div>
          <ul
            className={`text-[1.3rem] md:flex ${
              isMenuOpen ? "block" : "hidden"
            } space-y-8 md:space-y-0 items-center flex flex-col md:flex-row justify-center `}
          >
            <li className="md:ml-5 xl:mx-5 sm:mt-0 mt-10 hover:text-red-500">
              <NavLink to="/" onClick={closeMenu}>
                Material
              </NavLink>
            </li>
            <li className="md:ml-5 xl:mx-5 sm:mt-0 mt-10 hover:text-red-500">
              <NavLink to="/about" onClick={closeMenu}>
                About
              </NavLink>
            </li>
            <div>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded md:ml-10"
                onClick={toggleModal}
              >
                Admin
              </button>
            </div>
          </ul>
        </div>
      </div>
      {isModalOpen && <Modal toggleModal={toggleModal} />}
    </nav>
  );
}

export default Header;
