import Image from "next/image";
import { IHomeProps } from "../types";

const Layout = ({ children }: IHomeProps) => {
    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="max-w-3xl p-6 bg-linear-to-br from-[#ffffff] via-[#b3b2b0] to-[#46494b] shadow-lg rounded-2xl">
                {children}
                
                <div className="flex justify-end mt-6">
                    <Image
                        src="./img/logo.svg"
                        alt="Logo"
                        width={100}
                        height={60}
                        className="mb-2"
                        unoptimized
                    />
                </div>
            </div>
        </div>
    );
};

export default Layout;
