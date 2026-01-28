import { IRSSBData } from "@/app/types";
import React from "react";

const RssbDisplay = ({ data }: { data: IRSSBData | null }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full px-4 py-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md">
            {!!data ? (
                <>
                    <h1 className="mb-2 text-xl font-bold">Your RSSB Number</h1>
                    <p className='text-sm'>
                        You are still any employee: <strong className='text-lg text-orange-400'> {data.isEmployee ? "Yes" : "No"}</strong>
                    </p>
                    <div
                        className="box-border p-4 mt-4 transition-colors border border-dashed rounded-lg cursor-pointer bg-gray-100/90 hover:bg-gray-200"
                        onClick={() => handleCopy(data.rssbNumber)}
                        title="Click to copy"
                    >
                        <p className="text-3xl text-orange-400">
                            <strong>{data.rssbNumber}</strong>
                            <span className={`ml-2 text-xs transition-all ${copied ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                                {copied ? 'copied!' : 'copy'}
                            </span>
                        </p>
                    </div>
                </>
            ) : <p className="text-red-500">No RSSB number available. Check well your phoneNumber</p>
            }
        </div>
    );
};

export default RssbDisplay;
