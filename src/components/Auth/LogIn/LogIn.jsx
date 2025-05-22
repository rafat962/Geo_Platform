/* eslint-disable no-unused-vars */
import { cn } from "../../../lib/utils";
import { Label } from "../../../shared/ui/Lable";
import { Input } from "../../../shared/ui/Input";
import { useForm } from "react-hook-form";
import Backdrop from "@mui/material/Backdrop";
import { useLogin } from "../hooks/useAuth";
import { motion } from "framer-motion";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ToggleAuthorization } from "../AuthSlice";
const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { isPending, loginMutate } = useLogin();
    const queryClient = useQueryClient();
    function onSucses(data) {
        const { email, password } = data;
        const sendData = {
            email,
            password,
        };
        loginMutate(sendData, {
            onSuccess: (data) => {
                if (data.status !== "error") {
                    queryClient.setQueryData(["userData"], data.userData);
                    navigate(`/dashboard`);
                    localStorage.setItem("token", JSON.stringify(data.token));
                    dispatch(ToggleAuthorization(data.userData.role));
                    reset();
                }
            },
        });
    }
    // lan
    const { t } = useTranslation();
    return (
        // container
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-full h-screen  flex items-center justify-center">
                <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl  md:p-8 dark:bg-black">
                    <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                        {t("Welcome to Geo-Platform")}
                    </h2>
                    <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                        Login to Geo-Platform if you can because we don&apos;t
                        have a login flow yet.
                    </p>
                    <form className="my-8" onSubmit={handleSubmit(onSucses)}>
                        <LabelInputContainer className="mb-4 relative">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                disabled={isPending}
                                {...register("email", {
                                    required: true,
                                })}
                                id="email"
                                placeholder="projectmayhem@fc.com"
                                type="email"
                                className={`${errors.email ? "outline-2 outline-red-500 trans shadow-md shadow-red-500" : ""}`}
                            />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                disabled={isPending}
                                {...register("password", {
                                    required: true,
                                    min: 3,
                                })}
                                id="password"
                                placeholder="••••••••"
                                type="password"
                                className={`${errors.password ? "outline-2 outline-red-500 trans shadow-md shadow-red-500" : ""}`}
                            />
                        </LabelInputContainer>
                        <button
                            disabled={isPending}
                            className=" cursor-pointer   h-10 w-full rounded-md bg-gradient-to-br font-medium text-white bg-zinc-800 from-zinc-900 to-zinc-900 shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                            type="submit"
                        >
                            <span className=" ">Log In &rarr;</span>
                        </button>
                        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
                        {/* loading */}
                        {isPending && (
                            <Backdrop
                                sx={(theme) => ({
                                    color: "#fff",
                                    zIndex: theme.zIndex.drawer + 1,
                                })}
                                open={open}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        )}
                        <div className="flex flex-col space-y-4">
                            <button
                                onClick={() => navigate("/auth/signup")}
                                className=" cursor-pointer group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
                                type="submit"
                            >
                                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                    Signup
                                </span>
                                <HiArrowRightStartOnRectangle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                                <BottomGradient />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default LogIn;
const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-5 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100 " />
            <span className="absolute inset-x-30 -bottom-px mx-auto block h-8 w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 -hovegroupr/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};
