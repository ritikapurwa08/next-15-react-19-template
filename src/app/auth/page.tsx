"use client";

import { useState } from "react";
import Image from "next/image";
import AuthSignUpInputs from "@/components/features/auth/components/auth-sign-up-inputs";
import AuthSignInInputs from "@/components/features/auth/components/auth-sign-in-inputs";
import { authbg } from "../../../public/images";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleAuthMode = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <section className="flex flex-col-reverse lg:flex-row  items-center lg:justify-center max-w-5xl h-screen mx-auto p-4 gap-8">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <Image
          src={authbg}
          height={600}
          width={600}
          alt="authBg"
          className="max-w-full h-auto"
          priority
        />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-y-6 bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h1>
        <p className="text-gray-500">
          {isSignUp
            ? "Sign up to start your journey with us."
            : "Sign in to continue exploring our platform."}
        </p>

        {/* Authentication Form */}
        {isSignUp ? (
          <AuthSignUpInputs />
        ) : (
          <section>
            <AuthSignInInputs />
          </section>
        )}

        {/* Toggle Button */}

        <button
          onClick={toggleAuthMode}
          className="text-blue-500 hover:underline text-sm"
        >
          {isSignUp
            ? "Already have an account? Sign in"
            : "Don't have an account? Sign up"}
        </button>
      </div>
    </section>
  );
}
