import { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useParams } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
    trackingId: "",
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addContact } = useFirebase();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setFormData((prevData) => ({
        ...prevData,
        trackingId: id,
      }));
    }
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    document.title = "Contact | Purigo"
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      await addContact(formData.email, formData.subject, formData.message , formData.trackingId);
      const response = await fetch(
        "https://purigo-backend-2.onrender.com/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setStatus({
          message:
            "Your message has been sent successfully. Our team will contact you as soon as possible.",
          type: "success",
        });
        setFormData({ email: "", subject: "", message: "", trackingId: id || "" });
      } else {
        const errorData = await response.json();
        setStatus({
          message:
            errorData.message ||
            "There was an error sending your message. Please try again later.",
          type: "error",
        });
      }
    } catch (error) {
      setStatus({
        message:
          "There was an error sending your message. Please try again later.",
        type: "error",
      });
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <section className="bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="name@purigo.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {id && (
            <div>
              <label
                htmlFor="trackingId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Transaction ID
              </label>
              <input
                type="text"
                id="trackingId"
                className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                value={formData.trackingId}
                readOnly
              />
            </div>
          )}
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Let us know how we can help you"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Leave a comment..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white inline-block"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : (
              "Send message"
            )}
          </button>
        </form>
        {status && (
          <p
            className={`mt-4 text-center ${
              status.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.message}
          </p>
        )}
      </div>
    </section>
  );
};  

export default Contact;
