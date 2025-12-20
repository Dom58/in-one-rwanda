"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center">
      <main>
        <h1 className="text-3xl font-extrabold">Rwanda data management</h1>
        <h1 className="text-xl font-medium">All in 1 search</h1>
        <ul className="mt-4 space-y-1 list-disc list-inside">  
          <li className="text-sm">A centralized system for managing Rwanda's UPI and National ID data.</li>
          <li className="text-sm">Facilitates easy access and retrieval of citizen information.</li>
        </ul>
        <div className="mt-6">
          <Link href="/upi" className="text-lg font-bold text-orange-700 underline">
            Search UPI data
          </Link>
        </div>

        <div className="mt-2">
          <Link href="/citizen-information" className="text-lg font-bold text-orange-700 underline">
            Search national ID data
          </Link>
        </div>
      </main>
    </div>
  );
}
