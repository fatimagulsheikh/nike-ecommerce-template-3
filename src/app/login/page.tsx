// import React from "react";
// import logo from "@public/images/logo/logo.svg";
// import Image from "next/image";
// import Link from "next/link";
// import Button from "../components/Button";

// const page = () => {
//   return (
//     <div className="flex flex-col items-center py-10 px-10 md:px-0">
//       <Image className="pb-5" src={logo} width={40} height={10} alt="Logo" />
//       <h2 className="uppercase w-40 text-center font-bold pb-5">
//         YOUR ACCOUNT FOR EVERYTHING NIKE
//       </h2>
//       <form action="" className="flex flex-col w-full lg:w-96">
//         <input className="w-50 lg:w-96 border-[#E5E5E5] rounded-md mb-4 px-4 py-3 border-[2px] placeholder:text-text-secondary-gray" type="text" placeholder="Email Address" />
//         <input className="w-50 lg:w-96 border-[#E5E5E5] rounded-md mb-4 px-4 py-3 border-[2px] placeholder:text-text-secondary-gray" type="text" placeholder="Password" />
//         <div className="flex justify-between items-center py-5">
//           <div>
//             <input type="checkbox" id="remember" />
//             <label className="ml-2 pl-2 cursor-pointer text-text-secondary-gray" htmlFor="remember">
//                 Keep me signed in
//             </label>
//           </div>
//           <div>
//             <span>
//               <a href="#" className="text-[#BCBCBC]">Forgotten your password?</a>
//             </span>
//           </div>
//         </div>
//         <p className="text-text-secondary-gray text-center pb-6">By logging in, you agree to Nike's <Link className="underline" href="#">Privacy Policy</Link> and <Link className="underline" href="#">Terms of Use</Link>.</p>
//         <Button text="SIGN IN" classNames="rounded-sm py-3"/>
//         <p className="text-center"> <span className="text-text-secondary-gray">Not a Member? </span><span className="underline">Join Us.</span></p>
//       </form>
//     </div>
//   );
// };

// export default page;












"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
  useSignIn,
} from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { SiNike } from "react-icons/si";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { ImAppleinc } from "react-icons/im";


const Login = () => {
  const { user } = useUser(); // Get user details from Clerk
  const { signIn, setActive, isLoaded } = useSignIn(); // Clerk's sign-in function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      }
    } catch {
      setError("Sign-in failed");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-[600px]">
      {/* Right Section */}
      <div className="flex-1 mb-4 mt-4 bg-black flex justify-center items-center">
        <SiNike size={150} className="text-white" />
      </div>

      {/* Left Section */}
      <div className="flex-1 bg-white flex flex-col justify-center px-8 lg:px-20">
        <SignedIn>
          {/* When signed in */}
          <div className="flex flex-col items-center">
            <UserButton />
            <h1 className="text-3xl font-bold mb-4">
              Welcome, {user?.firstName || "User"}!
            </h1>
            <p className="mt-4 text-lg text-center">
              Shop now and use the coupon{" "}
              <span className="font-bold text-black">kaladi</span> to get a
              $50 discount on your next purchase!
            </p>
          </div>
        </SignedIn>

        <SignedOut>
          {/* When signed out */}
          <div>
            <h1 className="text-3xl font-bold mb-6">Login</h1>
            {error && <p className="text-red-500">{error}</p>}

            {/* Google Sign In Button */}
            <SignInButton mode="modal">
              <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-3 rounded-lg border border-gray-300 hover:bg-gray-100">
                <FcGoogle size={24} /> Continue with Google
              </button>
              
            </SignInButton>
            <SignInButton mode="modal">

            <button className="w-full mt-3 flex items-center justify-center gap-2 bg-white text-gray-700 py-3 rounded-lg border border-gray-300 hover:bg-gray-100">
              <ImAppleinc size={24} /> Continue with Apple
              </button>
              </SignInButton>


            <div className="text-center my-4 text-gray-500">or</div>

            {/* Email and Password Login */}
            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                  <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
                    👁
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-700 text-sm">Remember Me</span>
                </label>
                <Link href="#" className="text-sm text-gray-500 hover:underline">
                  Forgot Password
                </Link>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
              >
                Sign In
              </button>
            </form>
          </div>
        </SignedOut>
      </div>
    </div>
  );
};

export default Login;