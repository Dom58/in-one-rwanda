"use client";

import UpidataDisplay from "@/components/upi/UpidataDisplay";
import { fetchUpiData } from "@/services";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [upi, setUpi] = useState("");
  const [queryKey, setQueryKey] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [isAccessValid, setIsAccessValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchUpiData(upi),
    enabled: !!queryKey && isAccessValid,
  });

  const checkAccessCode = (code: number) => {
    const ACCESS_CODE = String(process.env.NEXT_PUBLIC_ACCESS_CODE).length;
    return code === ACCESS_CODE;
  };

  const handleVerifyAccessCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkAccessCode(Number(accessCode))) {
      setIsAccessValid(true);
      setAccessCode("");
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid access code. Please contact the system admin to provide the code.");
      setAccessCode("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQueryKey("upi-data");
  };

  return (
    <div className="flex items-center justify-center">
      <main>
        <h1 className="flex text-xl font-extrabold">
          <Link href="/" className="text-2xl text-blue-600">
            <span className="mr-2 text-orange-600">{`< `}</span>
          </Link>
          UPIs management system
        </h1>
        <p className="text-sm">
          A centralized system for searching Rwanda's UPI for 2020-2050 masterplan.
        </p>

        <form onSubmit={handleVerifyAccessCode} className={`mt-4 ${isAccessValid ? 'hidden' : ''}`}>
          <div className="mb-2">
            <label className="mb-1 text-gray-600" htmlFor="accessCode">
              Access Code(shared by system admin)
            </label>
            <input
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="Enter access code"
              className="w-full p-4 border border-white rounded-3xl focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="flex p-2 mt-2 mb-1 text-white bg-[#fe6787] cursor-pointer rounded-3xl"
          >
            Verify Access Code
          </button>
          {errorMessage && <p className="mt-1 text-sm text-red-600">{errorMessage}</p>}
        </form>

        <form onSubmit={handleSubmit} className={`mt-4 ${!isAccessValid ? 'blur-sm' : ''}`}>
          <p className="mb-1 text-gray-600">Land parcel UPI</p>
          <input
            type="text"
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
            placeholder="Enter a valid UPI (e.g 1/01/01/01/0001)"
            className="w-full p-4 border border-white rounded-3xl focus:outline-none"
            required
            disabled={!isAccessValid}
          />
          <button
            type="submit"
            className={`w-1/2 p-2 mt-4 mb-4 text-white bg-orange-700 rounded-3xl ${upi.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={!isAccessValid}
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
