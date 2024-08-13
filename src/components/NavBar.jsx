import React, { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import {
  RiUserLine,
  RiShoppingCartLine,
  RiMenuSearchLine,
} from "react-icons/ri";
import { useFirebase } from "../context/Firebase";
import { useCart } from "../context/CartContext";
import ItemCardSearch from "../components/ItemCardSearch";

const Navbar = () => {
  const { openCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const firebase = useFirebase();
  const isLoggedIn = firebase.isLoggedIn;
  const navigate = useNavigate();

  const { products } = useFirebase();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-40 text-lg transition-all duration-300 ${
        isSticky ? "bg-white shadow-lg" : "bg-white"
      }`}
    >
      <nav className="py-4 md:px-12 px-4 flex items-center justify-between">
        <Link to={"/"}>
          <div className="text-black flex font-bold text-lg items-center cursor-pointer hover:scale-105 transform transition-transform duration-200">
            <img
              src="/logonobg.png"
              alt="Pickle Shop Logo"
              className="h-20"
            />
            <h1 className="hidden md:block font-extrabold text-black text-4xl">
              PuriGO
            </h1>
          </div>
        </Link>
  
        {/* for larger device */}
        <div
          className={`hidden lg:flex items-center gap-6 text-black font-medium ${
            isSearchOpen ? "hidden" : ""
          }`}
        >
          <Link to="/" className="hover:text-gray-600  hover:scale-105 transform transition-transform duration-200">
            Home
          </Link>
          <Link
            to="/our-story"
            className="hover:text-gray-600  hover:scale-105 transform transition-transform duration-200"
          >
            Our Story
          </Link>
          <Link
            to="/products"
            className="hover:text-gray-600  hover:scale-105 transform transition-transform duration-200"
          >
            Shop
          </Link>
          <Link
            to="/account/tracking"
            className="hover:text-gray-600  hover:scale-105 transform transition-transform duration-200"
          >
            Track Order
          </Link>
          <Link
            to="/contact-us"
            className="hover:text-gray-600  hover:scale-105 transform transition-transform duration-200"
          >
            Contact Us
          </Link>
        </div>
  
        <div
          className={`flex items-center gap-6 ${
            isSearchOpen ? "hidden" : ""
          }`}
        >
          {isLoggedIn ? (
            <Link to={"/account"}>
              <RiUserLine className="text-black text-2xl cursor-pointer hover:text-gray-600  hover:scale-105 transform transition-transform duration-200" />
            </Link>
          ) : (
            <Link to={"/account/login"}>
              <RiUserLine className="text-black text-2xl cursor-pointer hover:text-gray-600  hover:scale-105 transform transition-transform duration-200" />
            </Link>
          )}
          <RiShoppingCartLine
            onClick={openCart}
            className="text-black text-2xl cursor-pointer hover:text-gray-600  hover:scale-105 transform transition-transform duration-200"
          />
          <Link to="/search">
            <RiMenuSearchLine
              className="text-black text-3xl cursor-pointer hover:text-gray-600  ml-4 hover:scale-105 transform transition-transform duration-200"
            />
          </Link>
        </div>
  
        {/* Menu toggle button for small devices */}
        <button
          onClick={toggleMenu}
          className={`lg:hidden text-3xl text-black hover:text-gray-600 transition-all ${
            isSearchOpen ? "hidden" : ""
          }`}
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </nav>
  
      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-20 flex flex-col bg-white bg-opacity-90 backdrop-blur-lg p-4 text-black transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <button
            onClick={toggleMenu}
            className="text-3xl text-black hover:text-gray-600  hover:scale-105 transform transition-transform duration-200"
          >
            <HiX />
          </button>
        </div>
        <div className="flex flex-col gap-6 mt-6 text-xl font-medium">
          <Link
            onClick={toggleMenu}
            to="/"
            className="py-2 hover:text-gray-600  hover:scale-105 transform transition-transform duration-200"
          >
            Home
          </Link>
          <Link
            onClick={toggleMenu}
            to="/our-story"
            className="py-2 hover:text-gray-600  hover:scale-105 transform transition-transform duration-200"
          >
            Our Story
          </Link>
          <Link
            onClick={toggleMenu}
            to="/products"
            className="py-2 hover:text-gray-600  hover:scale-105 transform transition-transform duration-200"
          >
            Shop
          </Link>
          <Link
            onClick={toggleMenu}
            to="/account/tracking"
            className="py-2 hover:text-gray-600  hover:scale-105 transform transition-transform duration-200"
          >
            Track Order
          </Link>
          <Link
            onClick={toggleMenu}
            to="/contact-us"
            className="py-2 hover:text-gray-600  hover:scale-105 transform transition-transform duration-200"
          >
            Contact Us
          </Link>
          <div className="flex justify-center mt-8">
            {isLoggedIn ? (
              <Link onClick={toggleMenu} to={"/account"}>
                <RiUserLine className="text-black text-3xl cursor-pointer hover:text-gray-600  hover:scale-105 transform transition-transform duration-200" />
              </Link>
            ) : (
              <Link onClick={toggleMenu} to={"/account/login"}>
                <RiUserLine className="text-black text-3xl cursor-pointer hover:text-gray-600  hover:scale-105 transform transition-transform duration-200" />
              </Link>
            )}
            <RiShoppingCartLine
              onClick={openCart}
              className="text-black text-3xl cursor-pointer hover:text-gray-600  ml-4 hover:scale-105 transform transition-transform duration-200"
            />
            <Link to="/search">
              <RiMenuSearchLine onClick={toggleMenu} className="text-black text-3xl cursor-pointer hover:text-gray-600  ml-4 hover:scale-105 transform transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};  

export default Navbar;

