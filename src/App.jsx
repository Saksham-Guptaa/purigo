import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import { Helmet } from 'react-helmet';

const Purigo = () => {
  return (
    <>
    <Helmet>
        <title>Buy Homemade Pickles (Achar) Online | Pan India Delivery | COD Available</title>
        <meta name="description" content="Order the best homemade pickles (achar) online with delivery across India. Enjoy traditional flavors with our wide variety of pickles. Cash on Delivery (COD) available. Shop now!" />
        <meta name="keywords" content="homemade pickles, pure, purigo, achar fresh, lal mirch bharwa achar, homemade achar, achar, aam ka achar purigo, hari mirch ka achar purigo, buy pickles online, pickles delivery India, achar online, homemade achar, traditional pickles, cash on delivery pickles, best pickles India, pickle varieties, Indian pickles" />
        <meta property="og:title" content="Buy Homemade Pickles (Achar) Online | Nationwide Delivery | COD Available" />
        <meta property="og:description" content="Order the best homemade pickles (achar) online with delivery across India. Enjoy traditional flavors with our wide variety of pickles. Cash on Delivery (COD) available. Shop now!" />
        <meta property="og:image" content="https://purigo.netlify.app/logonobg.png" />
        <meta property="og:url" content="https://purigo.netlify.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Buy Homemade Pickles (Achar) Online | Nationwide Delivery | COD Available" />
        <meta name="twitter:description" content="Order the best homemade pickles (achar) online with delivery across India. Enjoy traditional flavors with our wide variety of pickles. Cash on Delivery (COD) available. Shop now!" />
        <meta name="twitter:image" content="https://purigo.netlify.app/logonobg.png" />
        <meta name="twitter:site" content="@YOUR_TWITTER_HANDLE" />
        <meta name="twitter:creator" content="@YOUR_TWITTER_HANDLE" />
        <link rel="canonical" href="https://purigo.netlify.app/" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
    <div>
      <NavBar />
      <Cart />
      {/* <Banner/> */}
      <div className="mt-[110px]">
        <Outlet />
      </div>
      <Footer />
    </div>
    </>
  );
};

export default Purigo;

