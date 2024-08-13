import { useEffect, useRef, useState } from "react";
import { useFirebase } from "../context/Firebase";
import CarouselOWN from "../components/Carousel";
import { FaWhatsapp } from 'react-icons/fa';

import ItemCard from "../components/ItemCard";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import WhyUs from "../components/Whyus";
import Popup from "../components/Popup";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import FssaiAndMadeInIndia from "../components/Credits";

const HomePage = () => {
  const { products, loading, isLoggedIn } = useFirebase();

  const [recentlyViewed, setRecentlyViewed] = useState([]);
  useEffect(() => {
    document.title  = "Purigo Achar"
    const recentlyViewedData =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecentlyViewed(recentlyViewedData);
  }, []);

  const categories = [
    {
      image:
        "https://www.rosierfoods.com/cdn/shop/collections/DSC4615.jpg?v=1712577403",
      title: "Achar",
    },
    {
      image:
        "https://www.rosierfoods.com/cdn/shop/collections/Ajwain-2.jpg?v=1712577436",
      title: "Stone Pressed Oil",
    },
    {
      image:
        "https://www.rosierfoods.com/cdn/shop/collections/DSC4597.jpg?v=1712577463",
      title: "Honey",
    },
    {
      image:
        "https://www.rosierfoods.com/cdn/shop/collections/image_867e0c03-ac86-45ae-9acc-494cbb52a8d5.jpg?v=1712577492",
      title: "Nut Butter",
    },
    {
      image:
        "https://www.rosierfoods.com/cdn/shop/collections/image.jpg?v=1712577525",
      title: "Nut butters",
    },
    {
      image:
        "https://www.rosierfoods.com/cdn/shop/collections/Rectangle_11.png?v=1712577555",
      title: "All Foods",
    },
  ];

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4; // Number of products to display per page

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const [popupData, setPopupData] = useState(null);

  const placesInIndia = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", 
  "Chennai", "Kolkata", "Pune", "Jaipur", "Surat",
  "Lucknow", "Kanpur", "Nagpur", "Visakhapatnam", "Bhopal",
  "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra",
  "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli",
  "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad",
  "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi", "Howrah",
  "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur",
  "Madurai", "Raipur", "Kota", "Chandigarh", "Guwahati",
  "Hubli-Dharwad", "Thiruvananthapuram", "Mysore", "Tiruchirappalli", "Bareilly"
  ];
  const whatsappNumber = '7982033258';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const names = [
    "Yash",
    "Saksham",
    "Shivansh",
    "Ayush",
    "Kamla",
    "Shruti",
    "Ram",
    "Radha",
    "Shivam",
    "Aman",
    "Krish",
    "Vaibhav",
    "Raman",
    "Ayushi",
    "Shristi",
    "Mona",
    "Lata",
    "Anmol",
    "Aarav Patel", "Aadhya Sharma", "Vivaan Desai", "Diya Mehta", "Arjun Singh", 
  "Isha Kapoor", "Rohan Gupta", "Ananya Verma", "Karan Nair", "Priya Rao",
  "Dev Mishra", "Nisha Jain", "Ritika Joshi", "Akash Chatterjee", "Sneha Menon",
  "Vikram Bhatt", "Pooja Reddy", "Aditya Saxena", "Meera Kulkarni", "Rajiv Iyer",
  "Rhea Vyas", "Siddharth Bose", "Tanvi Rao", "Gaurav Arora", "Aisha Agarwal",
  "Kabir Malhotra", "Lavanya Seth", "Kushal Pandey", "Nidhi Bhattacharya", "Rishi Sinha",
  "Snehal Jha", "Amit Bansal", "Avni Das", "Harsh Vardhan", "Maya Srivastava",
  "Rajat Dubey", "Saumya Anand", "Naveen Ghosh", "Rachna Bajaj", "Vikas Mohan",
  "Tara Phadke", "Raghav Sharma", "Swati Mukherjee", "Kunal Chandra", "Arpita Sengupta",
  "Ravi Prasad", "Shreya Pathak", "Neeraj Kothari", "Ishita Garg", "Aayush Mehra"
  ];
  const DemoProducts = [
    "Aam Ka Achar",
    "Hari Mirch Ka Achar",
    "Lal mirch Ka Achar",
    "Lemon Sweet",
    "Nimbu Ka Achar",
    "Teet Ka Achar",
  ];
  const DemoImage = [
    "https://firebasestorage.googleapis.com/v0/b/purigo-26410.appspot.com/o/images%2F02c81171-1923-43c0-8ae1-2672cb9dafe2_aamkaaachar-removebg-preview.png?alt=media&token=707733b8-02af-40f9-b0cc-5ef6465922dd",
    "https://firebasestorage.googleapis.com/v0/b/purigo-26410.appspot.com/o/images%2Fc4f3c6ca-6882-44e2-bcd6-96441d9238b1_harimirchaarchar-removebg-preview.png?alt=media&token=3c1c6894-9e2e-426c-8f00-c39d9e949d43",
    "https://firebasestorage.googleapis.com/v0/b/purigo-26410.appspot.com/o/images%2F8c8d881a-3566-4f2a-94e6-dc1bbce0e6a5_lalmirchkabarwa-removebg-preview.png?alt=media&token=51b384f0-e94a-4669-9c98-995b226f8133",
    "https://firebasestorage.googleapis.com/v0/b/purigo-26410.appspot.com/o/images%2Fa03dba85-a583-414c-9758-8fd635c5dba4_LemonSweet-removebg-preview.png?alt=media&token=6efe1039-7dba-4597-92e2-0f851a730357",
    "https://firebasestorage.googleapis.com/v0/b/purigo-26410.appspot.com/o/images%2Ff8a49cfc-6563-4804-a17c-2ac6b2e1ad22_teetkaachar-removebg-preview.png?alt=media&token=a39a6cfa-350c-4d6f-97e0-f87555b51d16",
    "https://firebasestorage.googleapis.com/v0/b/purigo-26410.appspot.com/o/images%2Fb853a086-2295-471a-b7c4-45c85e163103_nibukaaachar-removebg-preview.png?alt=media&token=411dae47-2920-4335-b1eb-acd7f853b75a",
  ];

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateRandomPopupData = () => {
    const randomPlace =
      placesInIndia[Math.floor(Math.random() * placesInIndia.length)];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomProduct =
      DemoProducts[Math.floor(Math.random() * DemoProducts.length)];
    const randomImage = DemoImage[Math.floor(Math.random() * DemoImage.length)];
    const randomMinutesAgo = getRandomInt(1, 10);

    return {
      name: randomName,
      product: randomProduct,
      minutesAgo: randomMinutesAgo,
      place: randomPlace,
      imageUrl: randomImage,
    };
  };

  useEffect(() => {
    const showRandomPopup = () => {
      const data = generateRandomPopupData();
      setPopupData(data);

      setTimeout(() => {
        setPopupData(null);
      }, 10000);
    };

    showRandomPopup();

    const interval = setInterval(() => {
      showRandomPopup();
    }, 120000);

    return () => clearInterval(interval);
  }, []);

  const handleClosePopup = () => {
    setPopupData(null);
  };

  const getRandomProducts = (products, count = 3) => {
    const shuffledProducts = products.sort(() => Math.random() - 0.5);
    const randomProducts = shuffledProducts.slice(0, count);
    return randomProducts;
  };

  const scrollRef = useRef(null);

  const scrollToNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 250,
        behavior: "smooth",
      });
    }
  };

  const scrollToPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -250,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          {/* Skeleton loading */}
          <div className="animate-pulse bg-gray-200 p-4 w-full sm:w-3/4 rounded-lg overflow-hidden">
            <div className="animate-pulse w-full h-96 bg-gray-400"></div>
          </div>
        </div>
      ) : (
        <main>
          {/* Carousel */}
          {/* <section className="dark:bg-black">
            <CarouselOWN />
          </section> */}
  
          {popupData && (
            <Popup popupData={popupData} onClose={handleClosePopup} />
          )}
          <div className="fixed bottom-4 z-10 right-4">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300"
        >
          <FaWhatsapp size={24} />
        </a>
      </div>
  
          {/* Categories */}
          <section className="dark:bg-black py-6 sm:py-8 lg:py-10">
            <div className="flex justify-center items-center">
              <div className="max-w-7xl w-full px-3 sm:px-6 lg:px-8">
                <div className="max-w-2xl lg:max-w-full mx-auto flex justify-center items-center mb-4">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Line.png?v=1711450464"
                    alt="Divider"
                    className="h-px sm:h-1 mr-2 sm:mr-3"
                  />
                  <h2 className="text-lg sm:text-base font-bold text-gray-900 dark:text-white">
                    Shop By Category
                  </h2>
                  <img
                    src="https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Line.png?v=1711450464"
                    alt="Divider"
                    className="h-px sm:h-1 ml-2 sm:ml-3"
                  />
                </div>
  
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-center">
                  {categories.map((category, index) => (
                    <Link
                      to={`/category/${category.title}`}
                      key={index}
                      className="w-full max-w-xs sm:max-w-none transition-transform transform hover:scale-105 duration-300"
                    >
                      <div className="flex justify-center">
                        <div className="w-full overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                          <img
                            src={category.image}
                            alt={category.title}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
          
          {/* top picks */}
          <section className="dark:bg-black py-8 sm:py-10 lg:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:max-w-none">
                <div className="flex justify-center items-center flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-0">
                    Best Sellers
                  </h2>
                </div>
                <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
                  {currentProducts.map((product) => (
                    <ItemCard key={product.slug} item={product} />
                  ))}
                </div>
                {/* Pagination */}
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mr-2 px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded focus:outline-none focus:ring-4 focus:ring-gray-600"
                  >
                    Previous
                  </button>
                  {pageNumbers.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`mx-2 px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700 focus:outline-none ${
                        currentPage === pageNumber ? "bg-gray-900" : ""
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="ml-2 px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded focus:outline-none focus:ring-4 focus:ring-gray-600"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </section>
  
          <section className="mb-10">
            <WhyUs />
          </section>
  
          {/* top picks */}
          <section className="dark:bg-black py-8 sm:py-10 lg:py-12 overflow-x-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
              <div className="mx-auto max-w-2xl lg:max-w-none">
                <div className="max-w-2xl lg:max-w-full flex justify-center items-center mb-4">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Line.png?v=1711450464"
                    alt="Divider"
                    className="h-px sm:h-1 mr-2 sm:mr-3"
                  />
                  <h2 className="text-lg sm:text-base font-bold text-gray-900 dark:text-white">
                    Top Picks
                  </h2>
                  <img
                    src="https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Line.png?v=1711450464"
                    alt="Divider"
                    className="h-px sm:h-1 ml-2 sm:ml-3"
                  />
                </div>
                <div
                  className="mt-6 overflow-x-auto whitespace-nowrap scrollbar-hide"
                  ref={scrollRef}
                >
                  <div className="inline-flex space-x-6 lg:space-x-12">
                    {getRandomProducts(products, 4).map((product) => (
                      <div
                        key={product.slug}
                        className="flex-shrink-0 w-64 md:w-72 lg:w-80 transition-transform transform hover:scale-105 duration-300"
                      >
                        <ItemCard item={product} />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Navigation buttons */}
                <button
                  onClick={scrollToPrev}
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 text-gray-600 rounded-full p-2 focus:outline-none shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <HiChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={scrollToNext}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 text-gray-600 rounded-full p-2 focus:outline-none shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <HiChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </section>

          <section>
            <FssaiAndMadeInIndia/>
          </section>
  
          {/* Recently Viewed */}
          {recentlyViewed.length > 0 && (
            <section className="dark:bg-black py-8 sm:py-10 lg:py-12">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                  <div className="max-w-2xl lg:max-w-full justify-center flex items-center mb-4">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Line.png?v=1711450464"
                      alt="Divider"
                      className="h-px sm:h-1 mr-2 sm:mr-3"
                    />
                    <h2 className="text-lg sm:text-base font-bold text-gray-900 dark:text-white">
                      Recently Viewed
                    </h2>
                    <img
                      src="https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Line.png?v=1711450464"
                      alt="Divider"
                      className="h-px sm:h-1 ml-2 sm:ml-3"
                    />
                  </div>
                  <div
                    className="mt-6 overflow-x-auto whitespace-nowrap scrollbar-hide"
                    ref={scrollRef}
                  >
                    <div className="inline-flex space-x-6 lg:space-x-12">
                      {recentlyViewed.map((product) => (
                        <ItemCard key={product.slug} item={product} />
                      ))}
                    </div>
                  </div>
                  {/* Navigation buttons */}
                  <button
                    onClick={scrollToPrev}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 text-gray-600 rounded-full p-2 focus:outline-none shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <HiChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={scrollToNext}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 text-gray-600 rounded-full p-2 focus:outline-none shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <HiChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </section>
          )}
        </main>
      )}
    </div>
  );
};  

export default HomePage;
