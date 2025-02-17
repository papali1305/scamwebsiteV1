"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Page() {
  const Router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false); // State to control animation visibility

  useEffect(() => {
    if (
      email.length > 0 &&
      password.length > 0 &&
      username.length > 0
    ) {
      if (!email.includes("@gmail")) {
        setDisabled(true);
        toast.error("Use Gmail to create a new account");
      } else {
        setDisabled(false);
      }
    } else {
      setDisabled(true);
    }
  }, [email, password, username]);

  async function signup() {
    try {
      const userRequest = await axios.post("/api/user/signin", {
        username,
        email,
        password,
      });

      toast.success("Successfully signed up!");
      Router.push("/login");
    } catch (error: any) {
      if (error.response && (error.response.status === 404 || error.response.status === 400)) {
        toast.error("Email already exists");
      } else {
        console.error("An error occurred while signing up:", error);
        toast.error("An error occurred. Please try again later.");
      }
    }
  }

  // Function to handle "Sign In" link click
  const handleSignInClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    setShowAnimation(true); // Show animation
    setTimeout(() => {
      Router.push("/login"); // Redirect after animation
    }, 2000); // Delay for animation (adjust time as needed)
  };

  return (
    <section>
      <div>
        <Toaster />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign up
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline"
                onClick={handleSignInClick} // Trigger animation on click
              >
                Sign In
              </Link>
            </p>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Full Name{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Full Name"
                      id="name"
                      onChange={(e) => setUsername(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Email address{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    disabled={disabled}
                    onClick={signup}
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Create Account <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="h-full w-full">
          <Image
            height={1200}
            width={1200}
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
            alt=""
          />
        </div>
      </div>

      {/* Animation Section */}
      {showAnimation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="animation-container">
            <div className="robot-animation">
              {/* Add your animation code here (SVG, GIF, or CSS animation) */}
              <p className="text-white text-2xl">🤖</p>
              <p className="text-white text-lg">Welcome to the Future!</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animation-container {
          animation: fadeIn 0.5s ease-in-out;
        }
        .robot-animation {
          text-align: center;
          animation: shake 1s infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes shake {
          0% {
            transform: translate(0);
          }
          25% {
            transform: translate(-10px, 0);
          }
          50% {
            transform: translate(10px, 0);
          }
          75% {
            transform: translate(-10px, 0);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </section>
  );
}

export default Page;
