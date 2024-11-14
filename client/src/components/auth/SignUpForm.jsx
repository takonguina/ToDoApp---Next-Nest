import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import SubmitButton from "./SubmitButton";

const SignUpForm = () => {
  const { handleTokens } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation des champs
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.status === 201) {
        handleTokens(response.data.accessToken, response.data.refreshToken);
        navigate("/");
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("Email already exists. Please try another one.");
      } else if (error.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <form className="px-12 flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm my-2 font-medium text-gray-600"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          placeholder="Enter your first name"
          className="w-full p-1 rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="lastName"
          className="block text-sm my-2 font-medium text-gray-600"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          placeholder="Enter your last name"
          className="w-full p-1 rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm my-2 font-medium text-gray-600"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="w-full p-1 rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm my-2 font-medium text-gray-600"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          className="w-full p-1 rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm my-2 font-medium text-gray-600"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm your password"
          className="w-full p-1 rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {/* Utilisation du bouton réutilisable */}
      <SubmitButton text="Sign Up" />

      <p className="text-red-500 text-center">{error}</p>
    </form>
  );
};

export default SignUpForm;
