"use client";

import { AppConfig } from "@/app/configs";
import UpidataDisplay from "@/components/upi/UpidataDisplay";
import { fetchUpiData } from "@/services";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState, useEffect } from "react";

const Page = () => {
  const [upi, setUpi] = useState("");
  const [queryKey, setQueryKey] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [isAccessValid, setIsAccessValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const REQUIRED_CODE_LENGTH = String(AppConfig.accessCode).length;

  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchUpiData(upi),
    enabled: !!queryKey && isAccessValid,
  });

  const setAccessWithExpiry = (key: string, value: string) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + 24 * 60 * 60 * 1000,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  const checkAccessCode = (code: number) => {
    return code === REQUIRED_CODE_LENGTH;
  };

  const handleVerifyAccessCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkAccessCode(Number(accessCode))) {
      setAccessWithExpiry("accessCode", accessCode);
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

  useEffect(() => {
    const accessDataStr = localStorage.getItem("accessCode");
    if (!accessDataStr) return;

    try {
      const accessData = JSON.parse(accessDataStr);
      const now = new Date();

      if (now.getTime() > accessData.expiry) {
        localStorage.removeItem("accessCode");
        setIsAccessValid(false);
        return;
      }

      if (Number(accessData.value) === REQUIRED_CODE_LENGTH) {
        setIsAccessValid(true);
      }
    } catch (e) {
      localStorage.removeItem("accessCode");
    }
  }, [REQUIRED_CODE_LENGTH]);

  return (
    <div className="flex items-center justify-center">
      <main>
        <h1 className="flex text-xl font-extrabold">
          <Link href="/" className="text-2xl text-blue-600">
            <span className="mr-2 text-orange-600">{`< `}</span>
          </Link>
          UPIs management system
        </h1>

        <div className="p-2 mt-1 rounded-lg bg-gray-50/20">
          <ul className="mt-1 space-y-1 text-sm list-disc list-inside">
            <li> A centralized system for searching Rwanda's UPIs.</li>
            <li>View on Google Map and get real-time distances.</li>
          </ul>
        </div>

        {!isAccessValid && (
          <form onSubmit={handleVerifyAccessCode} className="mt-4">
            <div className="mb-2">
              <label className="mb-1 text-gray-600" htmlFor="accessCode">
                Access password (shared by system admin)
              </label>
              <input
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter access password"
                className="w-full p-4 border border-white rounded-3xl focus:outline-none"
                required
              />
            </div>
            <button type="submit" className="flex p-2 mt-2 mb-1 text-white bg-[#fe6787] rounded-3xl">
              Verify access password
            </button>
            {errorMessage && <p className="mt-1 text-sm text-red-600">{errorMessage}</p>}
          </form>
        )}

        <form onSubmit={handleSubmit} className={`mt-4 ${!isAccessValid ? 'blur-xs pointer-events-none' : ''}`}>
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
