"use client";

import { INewCitizenDataResponse } from "@/app/types";
import Link from "next/link";

const CitizenData = ({ data }: { data: INewCitizenDataResponse }) => {
    const { identification: citizen } = data?.data || {};

    return (
        <>
            <h1 className="mb-5 text-xl font-bold">Citizen information Overview</h1>
            <div className="grid max-w-full grid-cols-1 p-6 mx-auto space-x-4 space-y-6 bg-white rounded-lg shadow-lg">
                <div className="w-full">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-orange-400">Citizen</h2>
                        {!!citizen ? (
                            <div className="py-2">
                                <p><strong className="mr-1">ID No:</strong> {citizen.documentNumber}</p>
                                <p><strong className="mr-1">Names:</strong>  {citizen?.surnames} {citizen?.foreName}</p>
                                <p><strong className="mr-1">Date Of Birth:</strong>
                                    <span className="text-orange-400">
                                        {citizen?.dateOfBirth}
                                    </span>
                                </p>

                                <p><strong className="mr-1">Father Names:</strong> {citizen?.fatherNames}</p>
                                <p className="mb-4"><strong className="mr-1">Mother Names:</strong> {citizen?.motherNames}</p>

                                <p><strong className="mr-1">Place Of Birth:</strong> {citizen?.placeOfBirth}</p>
                                <p><strong className="mr-1">Country:</strong> {citizen.birthCountry}</p>

                                <p><strong className="mr-1">Province:</strong> {citizen?.province}</p>
                                <p><strong className="mr-1">District:</strong> {citizen?.district}</p>
                                <p><strong className="mr-1">Sector:</strong> {citizen?.sector}</p>
                                <p><strong className="mr-1">Cell:</strong> {citizen?.cell}</p>

                                <p><strong className="mr-1">Place Of Issue:</strong>
                                    <span className="text-orange-400">
                                        {citizen?.placeOfIssue}
                                    </span>
                                </p>
                                <p className="mb-4"><strong className="mr-1">Gender:</strong> {citizen?.sex}</p>
                                <p><strong className="mr-1">Civil Status:</strong> {citizen?.civilStatus}</p>
                                <p><strong className="mr-1">Marital Status:</strong>
                                    <span className="text-orange-400">{citizen?.maritalStatus}</span>
                                </p>
                                <p><strong className="mr-1">Spouse:</strong>
                                    <span className="text-orange-400"> {citizen?.spouse}</span>
                                </p>
                            </div>
                        ) : (
                            <p className="text-red-500">No citizen data found for the provided National ID.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CitizenData;
