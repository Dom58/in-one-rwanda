"use client";

import UpidataDisplay from "@/components/upi/UpidataDisplay";
import { fetchUpiData } from "@/services";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [upi, setUpi] = useState("");
  const [queryKey, setQueryKey] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchUpiData(upi),
    enabled: !!queryKey,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQueryKey("upi-data");
  };

  return (
    <div className="flex items-center justify-center">
      <main>
        <h1 className="flex text-3xl font-extrabold">
          <Link href="/" className="text-4xl text-blue-600"> <span className="mr-2 text-orange-600">{`< `}</span> </Link>
          UPIs management system
        </h1>
        <p className="text-sm">A centralized system for searching Rwanda's UPI for 2020-2050 masterplan.</p>
        <form onSubmit={handleSubmit} className="mt-4">
          <p className="mb-1 text-gray-600">Land parcel UPI</p>
          <input
            type="text"
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
            placeholder="Enter a valid UPI (e.g 1/01/01/01/0001)"
            className="w-full p-4 border border-white rounded-3xl focus:outline-none"
            required
          />
          <button
            type="submit"
            className={`w-1/2 p-2 mt-4 mb-4 text-white bg-orange-700 rounded-3xl ${upi.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <p>Error fetching data: {error.message}</p>}
        {data && <UpidataDisplay data={data.data} />}
      </main>
    </div>
  );
};

export default Page;
