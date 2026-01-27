"use client";

import Link from "next/link";
import React from "react";

export default function Home() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="flex items-center justify-center min-h-screen text-xl font-medium text-orange-600">Loading...</div>;
  }

  return (
    <div className="flex items-center">
      <main>
        <h1 className="text-2xl font-bold">Rwanda all in one finder</h1>
        <h1 className="font-medium text-orange-600 text-md">Centralized Rwanda data management</h1>
        <div>
          <div
            className="block mb-2 text-sm text-blue-500 underline rounded-lg lg:hidden"
            onClick={toggleVisibility}
          >
            {isVisible ? 'Hide what we offer' : 'Show what we offer'}
          </div>

          <div className={`lg:block p-2 mt-1 rounded-lg bg-gray-50/10 ${isVisible ? 'block' : 'hidden'} lg:block`}>
            <ul className="mt-1 space-y-1 text-sm list-disc list-inside">
              <li>A centralized system for managing Rwanda's UPI.</li>
              <li>Allow users to search for UPI data & view it on Google Maps.</li>
              <li>Allow users to get the real distance from the current location to reach the UPI.</li>
              <li>Easy access and get the citizen information from the national ID.</li>
            </ul>
          </div>
        </div>

        <div className="flex mt-2 mb-2">
          <Link href="/upi" className="p-2 px-4 mt-1 text-orange-600 bg-white border-amber-50 rounded-3xl text-md hover:text-orange-700 hover:bg-gray-100">
            Search UPI information
          </Link>
        </div>

        <div className="flex mb-2">
          <Link href="/citizen-information" className="p-2 px-4 text-orange-600 bg-white border-amber-50 text-md rounded-3xl hover:text-orange-700 hover:bg-gray-100">
            Search national ID information
          </Link>
        </div>

        <div className="flex mb-2">
          <Link href="/irembo-applications" className="p-2 px-4 text-orange-600 bg-white border-amber-50 text-md rounded-3xl hover:text-orange-700 hover:bg-gray-100">
            Search your Irembo application status
          </Link>
        </div>
      </main>
    </div>
  );
}
