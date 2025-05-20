/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getAllUsersApi,
    getPendingUsersApi,
    updatePasswordApi,
    updateUserApi,
} from "../helpers/settings.apis";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

// -------------------- UPDATE DATA --------------------
export function useUpdateData() {
    // lan
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const { mutate: updateDataMutate, isPending } = useMutation({
        mutationFn: updateUserApi,
        onError: (error, variables, context) => {
            // An error happened!
            toast.error(error.message);
        },
        onSuccess: (data, variables, context) => {
            if (data.status === "error") {
                toast.error(data.message);
                return;
            }
            toast.success(t("تم تحديث البيانات بنجاح"));
            queryClient.setQueryData(["userData"], data.userData);
            // reset();
        },
    });
    return { isPending, updateDataMutate };
}
// -------------------- UPDATE PASSWORD --------------------
export function useUpdatePassword() {
    // lan
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const { mutate: updatePasswordMutate, isPending } = useMutation({
        mutationFn: updatePasswordApi,
        onError: (error, variables, context) => {
            // An error happened!
            toast.error(error.message);
        },
        onSuccess: (data, variables, context) => {
            if (data.status === "error") {
                toast.error(data.message);
                return;
            }
            toast.success(t("تم تحديث كلمة المرور بنجاح"));
            // queryClient.setQueryData(["userData"], data.userData);
            // reset();
        },
    });
    return { isPending, updatePasswordMutate };
}
// -------------------- Get Pending Users --------------------
export function useGetPendingUsers() {
    const {
        isLoading,
        data: PendingUser,
        error,
    } = useQuery({
        queryKey: ["usersData"],
        queryFn: getPendingUsersApi,
        refetchInterval: 5000,
    });
    return { isLoading, PendingUser, error };
}
// -------------------- Get Pending Users --------------------
export function useGetAllUsers() {
    const {
        isSuccess,
        data: AllUser,
        error,
    } = useQuery({
        queryKey: ["allUsersData"],
        queryFn: getAllUsersApi,
        // refetchInterval: 500000,
    });
    return { isSuccess, AllUser, error };
}
