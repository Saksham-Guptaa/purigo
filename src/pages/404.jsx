import { Link } from "react-router-dom";
import '../error.css'

const ErrorPage = () => {
  return (
    <section className="page_404 flex items-center justify-center min-h-screen bg-white font-serif">
      <div className="container mx-auto px-4">
        <div className="row flex flex-col items-center">
          <div className="text-center">
            <div className="four_zero_four_bg bg-center bg-no-repeat bg-contain h-96" style={{ backgroundImage: `url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')` }}>
              <h1 className="text-8xl">404</h1>
            </div>

            <div className="contant_box_404 mt-[-3rem]">
              <h3 className="text-3xl mb-4">Look like you're lost</h3>
              <p className="text-lg mb-4">The page you are looking for is not available!</p>
              <Link to="/" className="link_404 inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300">Go to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
