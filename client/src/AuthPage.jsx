import { useState } from "react";
import SignInForm from "./components/auth/SignInForm";
import SignUpForm from "./components/auth/SignUpForm";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => setIsSignUp(!isSignUp);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-[0px_5px_15px_0px_rgba(0,0,0,0.25)] w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        {isSignUp ? <SignUpForm /> : <SignInForm />}
        <div className="text-center mt-16">
          <p>
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={toggleForm}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={toggleForm}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Sign Up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
