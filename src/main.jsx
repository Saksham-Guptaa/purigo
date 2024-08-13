import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import ErrorPage from "./pages/404.jsx";
import LoginPage from "./pages/Login";
import ProductDetailPage from "./pages/ProductOverview.jsx";
import { FirebaseProvider } from "./context/Firebase.jsx";
import SignUpPage from "./pages/SignUp.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AddNewProduct from "./pages/AddNewProduct.jsx";
import AllProducts from "./pages/AllProducts.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import WakeUpServer from "./components/WakeUpServer.jsx";

import { CartProvider } from "./context/CartContext.jsx";
import ShipmentTracking from "./pages/Tracking.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import AdminProduct from "./pages/AdminProduct.jsx";
import Contact from "./pages/Contact.jsx";
import Checkout from "./pages/Checkout.jsx";
import CategoryProduct from "./pages/CategoryProducts.jsx";
import CheckoutBuyNow from "./pages/CheckoutBuyNow.jsx";
import Coupons from "./pages/Coupons.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import SearchProducts from "./pages/SearchProducts.jsx";
import AboutUs from "./pages/Story.jsx";
import ScrollToTopOnMount from "./components/ScrollToTopOnMount.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <ErrorBoundary>
            <HomePage />
          </ErrorBoundary>
        ),
      },
      {
        path: "products/:id",
        element: (
          <ErrorBoundary>
            <ProductDetailPage />
          </ErrorBoundary>
        ),
      },
      {
        path: "products",
        element: (
          <ErrorBoundary>
            <AllProducts />
          </ErrorBoundary>
        ),
      },
      {
        path: "search",
        element: (
          <ErrorBoundary>
            <SearchProducts />
          </ErrorBoundary>
        ),
      },

      {
        path: "our-story",
        element: (
          <ErrorBoundary>
            <AboutUs />
          </ErrorBoundary>
        ),
      },

      {
        path: "category/:id",
        element: (
          <ErrorBoundary>
            <CategoryProduct />
          </ErrorBoundary>
        ),
      },
      {
        path: "category",
        element: (
          <ErrorBoundary>
            <CategoryProduct />
          </ErrorBoundary>
        ),
      },
      {
        path: "contact-us",
        element: (
          <ErrorBoundary>
            <Contact />
          </ErrorBoundary>
        ),
      },
      {
        path: "contact-us/:id",
        element: (
          <ErrorBoundary>
            <Contact />
          </ErrorBoundary>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "account",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <ErrorBoundary>
            <ProfilePage />
          </ErrorBoundary>
        ),
      },
      {
        path: "login",
        element: (
          <ErrorBoundary>
            <LoginPage />
          </ErrorBoundary>
        ),
      },
      {
        path: "register",
        element: (
          <ErrorBoundary>
            <SignUpPage />
          </ErrorBoundary>
        ),
      },
      
      {
        path: "tracking",
        element: (
          <ErrorBoundary>
            <ShipmentTracking />
          </ErrorBoundary>
        ),
      },
      {
        path: "tracking/:id",
        element: (
          <ErrorBoundary>
            <OrderDetails />
          </ErrorBoundary>
        ),
      },
      {
        path: "checkout",
        element: (
          <ErrorBoundary>
            <Checkout />
          </ErrorBoundary>
        ),
      },
      {
        path: "checkout/buy-now",
        element: (
          <ErrorBoundary>
            <CheckoutBuyNow />
          </ErrorBoundary>
        ),
      },
      
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "admin",
    children: [
      {
        path: "",
        element: (
          <ErrorBoundary>
            <AdminDashboard />
          </ErrorBoundary>
        ),
      },
      {
        path: "addnewproduct/:id",
        element: (
          <ErrorBoundary>
            <AddNewProduct />
          </ErrorBoundary>
        ),
      },
      {
        path: "coupons",
        element: (
          <ErrorBoundary>
            <Coupons />
          </ErrorBoundary>
        ),
      },
      {
        path: "addnewproduct",
        element:(
          <ErrorBoundary>
            <AddNewProduct />
          </ErrorBoundary>
        ),
      },
      
      {
        path: "viewproducts",
        element: (
          <ErrorBoundary>
            <AdminProduct />
          </ErrorBoundary>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <WakeUpServer>
    <CartProvider>
      <FirebaseProvider>
        <RouterProvider router={router} />
      </FirebaseProvider>
    </CartProvider>
  </WakeUpServer>
);
