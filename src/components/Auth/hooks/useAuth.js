/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
    activeAccountApi,
    loginApi,
    signUpApi,
    verfyUser,
} from "../helpers/auth.api";
// -------------------- Signup --------------------
export function useSignUp() {
    const { mutate: signupMutate, isPending } = useMutation({
        mutationFn: signUpApi,
        onError: (error, variables, context) => {
            // An error happened!
            toast.error(error?.message || "");
        },
        onSuccess: (data, variables, context) => {
            if (data.status === "error") {
                toast.error(data.message);
                return;
            }
            toast.success(data.message);
            // reset();
        },
    });
    return { isPending, signupMutate };
}
// -------------------- LOGIN --------------------
export function useLogin() {
    const queryClient = useQueryClient();
    const { mutate: loginMutate, isPending } = useMutation({
        mutationFn: loginApi,
        onError: (error, variables, context) => {
            // An error happened!
            toast.error(error.message);
        },
        onSuccess: (data, variables, context) => {
            if (data.status === "error") {
                toast.error(data.message);
                return;
            }
            toast.success(data.message);
            queryClient.setQueryData(["verifiedUser"], data);
            // reset();
        },
    });
    return { isPending, loginMutate };
}
// -------------------- emailActive --------------------
export function useActive() {
    const { mutate: activeMutate, isPending } = useMutation({
        mutationFn: activeAccountApi,
        onError: (error, variables, context) => {
            // An error happened!
            toast.error(error?.message || "");
        },
        onSuccess: (data, variables, context) => {
            console.log(data);
            if (data.status === "error") {
                toast.error(data.message);
                return;
            }
            toast.success(data.message);
            // reset();
        },
    });
    return { isPending, activeMutate };
}
// -------------------- verfyToken --------------------
export function useVerfyToken() {
    const queryClient = useQueryClient();
    const {
        mutate: verefytoken,
        isPending,
        data,
        error,
    } = useMutation({
        mutationFn: verfyUser,
        onError: (error, variables, context) => {
            // An error happened!
            toast.error(error?.message || "");
        },
        onSuccess: (data, variables, context) => {
            queryClient.setQueryData(["userData"], data?.data?.userData);
            queryClient.setQueryData(["verifiedUser"], data.status);
        },
    });
    return { isPending, verefytoken, data, error };
}
