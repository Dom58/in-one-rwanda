import { IPasswordChecker } from "@/app/types";

const PasswordChecker = (
    {
        isAccessValid,
        handleVerifyAccessCode,
        accessCode,
        setAccessCode,
        errorMessage
    }: IPasswordChecker) => {
    return (
        <>
            {!isAccessValid && (
                <form onSubmit={handleVerifyAccessCode} className="mt-4">
                    <div className="mb-2">
                        <label className="mb-1 text-gray-600" htmlFor="accessCode">
                            Access password (shared by system admin)
                        </label>
                        <input
                            type="password"
                            name="password"
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
            )
            }
        </>
    );
};

export default PasswordChecker;
