"use client";

import { useState } from "react";
import Image from "next/image";
import AuthSignUpInputs from "@/components/features/auth/components/auth-sign-up-inputs";
import AuthSignInInputs from "@/components/features/auth/components/auth-sign-in-inputs";
import { authbg } from "../../../public/images";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-0.5">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8  bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Image Section */}
        <div className="hidden lg:flex items-center justify-center bg-blue-50 sm:p-0 p-8">
          <Image
            src={authbg} // Updated to use a more standard path
            height={800}
            width={800}
            alt="Authentication Background"
            className="max-w-full min-h-full min-w-full object-cover "
            priority
          />
        </div>

        {/* Form Section */}
        <div className="flex items-center justify-center  p-6 sm:p-0.5 lg:p-12">
          {isSignUp ? (
            <AuthSignUpInputs isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
          ) : (
            <AuthSignInInputs isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
          )}
        </div>
      </div>
    </div>
  );
}
