"use client";

import { AppConfig } from "@/app/configs";
import { INewCitizenDataResponse } from "@/app/types";
import CitizenData from "@/components/citizenData/CitizenData";
import PasswordChecker from "@/components/common/PasswordChecker";
import { findNationalIdData } from "@/services";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
const REQUIRED_CODE_LENGTH = String(AppConfig.accessCode).length;

const Page = () => {
  const searchParams = useSearchParams();
  const paramNationalId = searchParams.get("nationalId") || ""
  const [nationalId, setNationalId] = useState(paramNationalId);
  const [data, setData] = useState<INewCitizenDataResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [isAccessValid, setIsAccessValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  useEffect(() => {
    if (paramNationalId) {
      setNationalId(paramNationalId);
      submitInformationTracker();
    }
  }, [paramNationalId]);

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

  const submitInformationTracker = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    setLoading(true);
    mutation.mutate(nationalId);
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
          <Link href="/" className="text-2xl text-blue-600"> <span className="mr-2 text-orange-600">{`< `}</span> </Link>
          Rwanda national ID system
        </h1>

        <div className="p-2 mt-1 rounded-lg bg-gray-50/20">
          <ul className="mt-1 space-y-1 text-sm list-disc list-inside">
            <li>Facilitates easy access and fetch the citizen information.</li>
            <li>Easy access and get the citizen information from the national ID.</li>
          </ul>
        </div>

        <PasswordChecker
          isAccessValid={isAccessValid}
          handleVerifyAccessCode={handleVerifyAccessCode}
          accessCode={accessCode}
          setAccessCode={setAccessCode}
          errorMessage={errorMessage}
        />

        <form onSubmit={submitInformationTracker} className={`mt-4 ${!isAccessValid ? 'blur-xs pointer-events-none' : ''}`}>
          <p className="mb-1 text-gray-600">National ID</p>
          <input
            type="text"
            value={nationalId}
            name="nationalId"
            onChange={(e) => {
              setNationalId(e.target.value);
              setError("");
              setData(null);
            }}
            placeholder="Enter national ID"
            className="w-full p-4 border border-white rounded-3xl focus:outline-none"
            required
            disabled={!isAccessValid}
          />
          <button
            type="submit"
            className={`w-1/2 p-2 mt-4 mb-4 text-white bg-orange-700 rounded-3xl ${nationalId.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={!isAccessValid}
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
