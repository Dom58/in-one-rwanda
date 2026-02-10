"use client";

import { AppConfig } from "@/app/configs";
import PasswordChecker from "@/components/common/PasswordChecker";
import { queryClient } from "@/components/common/Provider";
import IremboApplicationDataDisplay from "@/components/irembo/IremboApplicationDataDisplay";
import { findIremboApplicationData } from "@/services";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
const REQUIRED_CODE_LENGTH = String(AppConfig.accessCode).length;

const Page = () => {
  const [applicationNumber, setIremboApplicationNumber] = useState("");
  const [queryKey, setQueryKey] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [isAccessValid, setIsAccessValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey, applicationNumber],
    queryFn: () => findIremboApplicationData(applicationNumber),
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIremboApplicationNumber(value);

    if (queryKey) {
      setQueryKey("");
      queryClient.removeQueries({ queryKey: ["irembo-data"] });
    }
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
    setQueryKey("irembo-data");
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
          Irembo application status oveview
        </h1>

        <div className="p-2 mt-1 rounded-lg bg-gray-50/20">
          <ul className="mt-1 space-y-1 text-sm list-disc list-inside">
            <li>Find your Irembo application number.</li>
            <li>View your application details.</li>
          </ul>
        </div>

        <PasswordChecker
          isAccessValid={isAccessValid}
          handleVerifyAccessCode={handleVerifyAccessCode}
          accessCode={accessCode}
          setAccessCode={setAccessCode}
          errorMessage={errorMessage}
        />

        <form onSubmit={handleSubmit} className={`mt-4 ${!isAccessValid ? 'blur-xs pointer-events-none' : ''}`}>
          <p className="mb-1 text-gray-600">Fill Irembo Application Number</p>
          <input
            type="text"
            value={applicationNumber}
            name="applicationNumber"
            onChange={handleInputChange}
            placeholder="Enter irembo application number"
            className="w-full p-4 border border-white rounded-3xl focus:outline-none"
            required
            disabled={!isAccessValid}
          />
          <button
            type="submit"
            disabled={!isAccessValid || isLoading}
            className={`w-1/2 p-2 mt-4 mb-4 text-white bg-orange-700 rounded-3xl ${applicationNumber.length === 0 || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>

        {queryKey && (
          <>
            {error && <p className="text-red-600">Error fetching data: {error.message}</p>}
            {data && <IremboApplicationDataDisplay data={data?.data} />}
          </>
        )}
      </main>
    </div>
  );
};

export default Page;
