"use client";

import CitizenData from "@/components/citizenData/CitizenData";
import { findNationalIdData } from "@/services";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [nationalId, setNationalId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: findNationalIdData,
    onError(error: any) {
      const errorMessage = error.response?.data?.message
        ? error.response?.data?.message
        : error.response?.data?.error.content || error.message;
      setError(errorMessage);
      setNationalId("");
      setLoading(false);
    },
    onSuccess: (res) => {
      setLoading(false);
      setData(res);
      setError("");
      setNationalId("");
    },
  });

  const submitInformationTracker = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    mutation.mutate(nationalId);
  };

  return (
    <div className="flex items-center justify-center">
      <main>
        <h1 className="flex text-3xl font-extrabold">
          <Link href="/" className="text-4xl text-blue-600"> <span className="mr-2 text-orange-600">{`< `}</span> </Link>
          Rwanda national ID system
        </h1>
        <p className="text-sm">Facilitates easy access and retrieval of citizen information.</p>
        <form onSubmit={submitInformationTracker} className="mt-4">
          <p className="mb-1 text-gray-600">National ID</p>
          <input
            type="text"
            value={nationalId}
            onChange={(e) => {
              setNationalId(e.target.value);
              setError("");
              setData(null);
            }}
            placeholder="Enter national ID"
            className="w-full p-4 border border-white rounded-3xl focus:outline-none"
            required
          />
          <button
            type="submit"
            className={`w-1/2 p-2 mt-4 mb-4 text-white bg-orange-700 rounded-3xl ${nationalId.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <p className="text-red-500">Error fetching data: {error}</p>}
        {data && <CitizenData data={data} />}
      </main>
    </div>
  );
};

export default Page;
