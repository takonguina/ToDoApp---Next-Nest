import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    console.log("Email:", email, "Password:", password);
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email: email,
        password: password,
      });

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error(error.response.data);
      setError("An error occurred. Please try again later.");
    }
  };
  return (
    <form className="px-12 flex flex-col gap-4" onSubmit={handleSubmit}>
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
      <button
        type="submit"
        className="w-full mt-2 p-3 text-white font-semibold rounded-lg shadow-md transition-all duration-500 bg-gradient-to-tl from-blue-600 to-blue-600 via-cyan-400 bg-size-200 bg-pos-0 hover:bg-pos-100"
      >
        Sign In
      </button>
      <p className="text-red-500 text-center">{error}</p>
    </form>
  );
};

export default SignUpForm;
