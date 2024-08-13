import { useFirebase } from "../context/Firebase";
import { Link } from "react-router-dom";
import { RiFacebookFill, RiTwitterFill, RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const firebase = useFirebase();

  return (
    <footer className="bg-white text-black py-8 shadow-lg">
      <div className="mx-auto w-full max-w-screen-xl p-4 lg:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link to="/" className="flex items-center mb-6 md:mb-0 hover:scale-105 transform transition-transform duration-200">
            <img src="/logonobg.png" className="h-24" alt="Purigo" />
            <h1 className="font-extrabold hidden md:block text-4xl ml-2 text-black">Purigo</h1>
          </Link>
          <ul className="flex flex-col md:flex-row gap-6 text-center md:text-left mb-6 md:mb-0">
            <li>
              <Link to="/" className="hover:text-gray-600 text-black  hover:scale-105 transform transition-transform duration-200">Home</Link>
            </li>
            <li>
              <Link to="/our-story" className="hover:text-gray-600 text-black  hover:scale-105 transform transition-transform duration-200">Our Story</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-gray-600  text-black hover:scale-105 transform transition-transform duration-200">Shop</Link>
            </li>
            <li>
              <Link to="/account/tracking" className="hover:text-gray-600  text-black hover:scale-105 transform transition-transform duration-200">Track Order</Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-gray-600 text-black  hover:scale-105 transform transition-transform duration-200">Contact Us</Link>
            </li>
          </ul>
          <div className="flex gap-4">
            <a href="#" className="text-black hover:text-gray-600  hover:scale-105 transform transition-transform duration-200">
              <RiFacebookFill className="w-6 h-6" />
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="#" className="text-black hover:text-gray-600  hover:scale-105 transform transition-transform duration-200">
              <RiTwitterFill className="w-6 h-6" />
              <span className="sr-only">Twitter page</span>
            </a>
            <a href="#" className="text-black hover:text-gray-600 hover:scale-105 transform transition-transform duration-200">
              <RiInstagramFill className="w-6 h-6" />
              <span className="sr-only">Instagram page</span>
            </a>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <span className="text-sm text-center sm:text-left">© 2023 Purigo. All Rights Reserved.</span>
          <button onClick={firebase.logout} className="text-black hover:text-gray-600  mt-4 sm:mt-0 hover:scale-105 transform transition-transform duration-200">
            Logout
          </button>
        </div>
        <div className="mt-6">
          <iframe
            src="https://www.google.com/maps?q=28.8462045,77.082528&output=embed"
            className="w-full h-64 md:h-96 border-0 shadow-md"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </footer>
  );
};  

export default Footer;
