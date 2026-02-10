"use client";

import { formatDate } from "@/app/constants";

const IremboApplicationDataDisplay = ({ data }: { data: any }) => {

    return (
        <>
            {(!!data && data.applicationId?.length > 0) ? (
                <>
                    <h1 className="mt-6 mb-5 text-xl font-bold">Irembo Application Overview</h1>
                    <div className="grid max-w-full grid-cols-1 p-6 mx-auto space-x-4 space-y-6 bg-white rounded-lg shadow-lg">
                        <div className="p-4 mb-6 shadow-sm rounded-2xl">
                            <p className="mb-2"><strong>Applied service:</strong> {data.serviceName}</p>
                            <p><strong>Submission Date:</strong>
                                <span className="ml-1">
                                    {data?.submissionDate ? formatDate(data?.submissionDate) : ""}
                                </span>
                            </p>
                            <p><strong>Applicant Status:</strong>
                                <span className="ml-1 font-semibold text-orange-400">
                                    {data?.applicationState && data?.applicationState.replace(/_/g, ' ')}
                                </span>
                            </p>
                            <p><strong>Service price:</strong> {data.price}</p>
                        </div>

                        <div className="p-4 bg-gray-100 shadow-md rounded-2xl">
                            <div className="mb-6">
                                <p><strong>Applicant Name:</strong>
                                    <span className="ml-1">
                                        {data.applicantName}
                                    </span>
                                </p>

                                <p><strong>Applicant Phone Number:</strong>
                                    <span className="ml-1">
                                        {data.applicantPhoneNumber}
                                    </span>
                                </p>
                                <p><strong>Applicant Email Address:</strong>
                                    <span className="ml-1">
                                        {data.applicantEmailAddress}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            ) : <p className="text-red-500">No irembo application available. Check well the your application number.</p>
            }
        </>
    );
};

export default IremboApplicationDataDisplay;
