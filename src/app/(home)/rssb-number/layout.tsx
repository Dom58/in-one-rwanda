import { Metadata } from "next";

export const metadata: Metadata = {
    title: "RSSB Number | All in one finder system",
    description: "RSSB Number - Find your RSSB number.",
};

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    );
};

export default layout;
