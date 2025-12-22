import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Citizen Information | All in one finder system",
  description: "Citizen Information Management System - Manage All Citizen data efficiently and securely.",
};

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    );
};

export default layout;
