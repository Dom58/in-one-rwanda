"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center">
      <main>
        <h1 className="text-3xl font-bold">All in one finder</h1>
        <h1 className="font-medium text-orange-600 text-md">Centralized Rwanda data management</h1>
        <div className="p-2 mt-2 rounded-lg bg-gray-50/10">
          <ul className="mt-1 space-y-1 text-sm list-disc list-inside">
            <li>A centralized system for managing Rwanda's UPI.</li>
            <li>Allow users to search for UPI data & view it on google maps</li>
            <li>Allow users to get the real distance from the current location to reach the UPI.</li>
            <li>Easy access and retrieval of citizen information from his national ID.</li>
          </ul>
        </div>

        <div className="mt-6">
          <Link href="/upi" className="p-2 px-4 mt-6 font-bold text-orange-600 bg-white border-amber-50 rounded-3xl text-md hover:text-orange-700 hover:bg-gray-100">
            Search UPI information
          </Link>
        </div>

        <div className="mt-6 mb-2">
          <Link href="/citizen-information" className="p-2 px-4 font-bold text-orange-600 bg-white border-amber-50 text-md rounded-3xl hover:text-orange-700 hover:bg-gray-100">
            Search national ID information
          </Link>
        </div>

        <div className="mt-6 mb-2">
          <Link href="/#iremboApplications" className="p-2 px-4 font-bold text-orange-600 bg-white border-amber-50 text-md rounded-3xl hover:text-orange-700 hover:bg-gray-100">
            Search your Irembo application status
          </Link>
        </div>

        <div className="mt-6 mb-2">
          <Link href="/#forexRates" className="p-2 px-4 font-bold text-orange-600 bg-white border-amber-50 text-md rounded-3xl hover:text-orange-700 hover:bg-gray-100">
            View current forex rates
          </Link>
        </div>
      </main>
    </div>
  );
}
