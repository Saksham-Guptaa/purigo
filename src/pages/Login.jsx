import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const LoginPage = ({ from }) => {
  const { login, loading, error, user, isLoggedIn } = useFirebase();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Login | Purigo"
  }, [])
  

  const handleSignIn = useCallback(
    async (e) => {
      e.preventDefault();
      const user = await login(email, password);
      const from = location.state?.from?.pathname || "/";
      if (user) {
        navigate(from);
      }
    },
    [login, email, password, location.state?.from?.pathname, navigate]
  );

  useEffect(() => {
    const from = location.state?.from?.pathname || "/";
    if (isLoggedIn === true) {
      navigate(from);
    }
  }, [isLoggedIn, location.state?.from?.pathname, navigate]);

  return (
    <section className="bg-white text-black min-h-screen flex justify-center items-center">
  <div className="max-w-md w-full mx-auto p-8 border border-gray-300 bg-white rounded-lg shadow-lg">
    <a
      href="/"
      className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
    >
      <img className="w-8 h-8 mr-2" src="/logonobg.png" alt="logo" />
      PuriGO
    </a>
    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 mb-6">
      Sign in to your account
    </h1>
    <form onSubmit={handleSignIn} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          placeholder="name@company.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>} {/* Use error from useFirebase */}
      <button
        type="submit"
        className="w-full text-white bg-black hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-600 font-medium rounded-lg text-sm px-5 py-5 text-center relative"
        disabled={loading}
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0120.708 7.5H16m-2 14v-4m0 0a8 8 0 01-7.745-10.256l1.53 1.53A5.996 5.996 0 0012 20v-4"
              ></path>
            </svg>
          </div>
        ) : (
          "Sign in"
        )}
      </button>
      <p className="text-sm font-light text-gray-500">
        Don’t have an account yet?{" "}
        <Link
          to="/account/register"
          className="font-medium text-black hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  </div>
</section>
  );
};

export default LoginPage;
