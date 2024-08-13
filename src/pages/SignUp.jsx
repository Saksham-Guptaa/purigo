import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const SignUpPage = () => {
  const { createUserWithEmailAndPasswordFirebase, loading, user, error , login } =
    useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("")
  const [phone, setphone] = useState("")

  useEffect(() => {
    document.title = "Signup | Purigo"
  }, [])

  const handleSignUp = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email || !password || !fullName || !address || !phone) {
        return;
      }
      const user = await createUserWithEmailAndPasswordFirebase(
        email,
        password,
        fullName,
        address,
        phone
      );
      if (user) {
        try {
          await login(email,password)
          fetch("https://purigo-backend-2.onrender.com/sendverifymail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: fullName,
              email: email,
              userId: user.uid,
            }),
          });
          navigate("/");
        } catch (error) {
          console.error("Error sending verification email:", error);
        }
      }
    },
    [
      email,
      password,
      address,
      fullName,
      phone
    ]
  );
  

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="bg-white dark:bg-black min-h-screen p-6 text-black dark:text-white">
      {/* Registration Form */}
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <Link to="/" className="text-2xl font-semibold text-gray-900 dark:text-white">
              <img className="w-8 h-8 mr-2 inline-block" src="/logonobg.png" alt="logo" />
              PuriGO
            </Link>
            <h1 className="text-xl font-bold mt-4">Register</h1>
          </div>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-800 dark:border-gray-700"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Number</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-800 dark:border-gray-700"
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-800 dark:border-gray-700"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-800 dark:border-gray-700"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-800 dark:border-gray-700"
                required
              />
            </div>
            {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 text-white font-semibold rounded-md shadow-sm bg-black dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-600 dark:focus:ring-gray-400"
            >
              {loading ? (
                <svg className="animate-spin inline-block w-4 h-4 mr-2 text-white dark:text-black" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0120.708 7.5H16m-2 14v-4m0 0a8 8 0 01-7.745-10.256l1.53 1.53A5.996 5.996 0 0012 20v-4"></path>
                </svg>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/account/login" className="font-medium text-gray-900 dark:text-white hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
      {/* WhatsApp Icon */}
      
    </div>
  );
};

export default SignUpPage;
