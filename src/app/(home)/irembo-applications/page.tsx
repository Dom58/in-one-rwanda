"use client";

import { findIremboApplicationData } from "@/services";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [applicationNumber, setIremboApplicationNumber] = useState("");
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: findIremboApplicationData,
    onError(error: any) {
      const errorMessage = error.response?.data?.message
        ? error.response?.data?.message
        : error.response?.data?.error.content || error.message;
      setError(errorMessage);
      setIremboApplicationNumber("");
      setLoading(false);
    },
    onSuccess: (res) => {
      setLoading(false);
      setData(res);
      setError("");
      setIremboApplicationNumber("");
    },
  });

  const submitInformationTracker = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    mutation.mutate(applicationNumber);
  };

  return (
    <div className="flex items-center justify-center">
      <main>
        <h1 className="flex text-xl font-extrabold">
          <Link href="/" className="text-2xl text-blue-600"> <span className="mr-2 text-orange-600">{`< `}</span> </Link>
          Irembo application status
        </h1>
        <p className="text-sm">Facilitates easy access and retrieval of Irembo application status.</p>
        <form onSubmit={submitInformationTracker} className="mt-4">
          <p className="mb-1 text-gray-600">Irembo Application Number</p>
          <input
            type="text"
            value={applicationNumber}
            name="applicationNumber"
            onChange={(e) => {
              setIremboApplicationNumber(e.target.value);
              setError("");
              setData(null);
            }}
            placeholder="Enter Irembo Application Number"
            className="w-full p-4 border border-white rounded-3xl focus:outline-none"
            required
          />
          <button
            type="submit"
            className={`w-1/2 p-2 mt-4 mb-4 text-white bg-orange-700 rounded-3xl ${applicationNumber.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <p className="text-red-500">{error}</p>}
        {data && <pre className="p-4 overflow-x-auto bg-gray-100 rounded-lg">{JSON.stringify(data, null, 2)}</pre>}
      </main>
    </div>
  );
};

export default Page;
