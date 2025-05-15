/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { InputOtp } from "primereact/inputotp";
import { useNavigate, useParams } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { FlipWords } from "../../../../shared/ui/FlipWords";
import { ButtonA } from "../../../../shared/ui/ButtonA";
import { useActive } from "../../hooks/useAuth";
import { motion } from "framer-motion";
const OTP = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    useEffect(() => {
        localStorage.setItem(token, JSON.stringify(token));
    }, [token]);
    const [otp, setOtp] = useState(null);
    const { isPending, activeMutate } = useActive();
    const onSubmit = () => {
        if (otp?.length < 6 || !otp) {
            return;
        }
        const sentData = {
            otp,
        };
        activeMutate(sentData, {
            onSuccess: (data) => {
                if (data.status !== "error") {
                    navigate(`/auth/login`);
                }
            },
        });
    };
    const onClear = () => {
        setOtp();
    };
    return (
        <PrimeReactProvider value={{ ripple: true }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="w-full h-screen flex flex-col items-center justify-center space-y-8 ">
                    <div className="flex flex-col space-y-1 items-center justify-center">
                        <div className="flex items-center justify-center">
                            <h1 className="text-white text-2xl font-sec font-bold">
                                Active Your
                            </h1>
                            <div className="w-24 overflow-hidden text-2xl ">
                                <FlipWords
                                    words={["Account", "Profile", "Access"]}
                                    className="text-white"
                                />
                            </div>
                        </div>
                        <p className="text-gray-400 font-sec">
                            Please enter the code sent to your phone.
                        </p>
                    </div>
                    {/* input */}
                    <InputOtp
                        disabled={isPending}
                        length={6}
                        value={otp} // ✅ make it a controlled component
                        onChange={(e) => setOtp(e.value)}
                    />
                    {/* button */}
                    <div className="flex items-center justify-center space-x-4">
                        {/* clear */}
                        <ButtonA
                            disabled={isPending}
                            onClick={onClear}
                            borderRadius="1.2rem"
                            borderClassName="bg-[radial-gradient(#e90e0e_40%,transparent_60%)]"
                            className="bg-slate-900 w-24  text-white  border-slate-800 cursor-pointer hover:bg-slate-800 trans"
                        >
                            Clear
                        </ButtonA>
                        {/* submit */}
                        <ButtonA
                            disabled={isPending}
                            onClick={onSubmit}
                            borderRadius="1.75rem"
                            className="bg-slate-900 w-52  text-white  border-slate-800 cursor-pointer hover:bg-slate-800 trans"
                        >
                            Active Your Account
                        </ButtonA>
                    </div>
                </div>
            </motion.div>
        </PrimeReactProvider>
    );
};

export default OTP;
