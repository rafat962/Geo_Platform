/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserApi } from "../helpers/settings.apis";
import toast from "react-hot-toast";

// -------------------- LOGIN --------------------
export function useUpdateData() {
    const queryClient = useQueryClient();
    const { mutate: updateDataMutate, isPending } = useMutation({
        mutationFn: updateUserApi,
        onError: (error, variables, context) => {
            // An error happened!
            toast.error(error.message);
        },
        onSuccess: (data, variables, context) => {
            console.log(data);
            if (data.status === "error") {
                toast.error(data.message);
                return;
            }
            toast.success("تم تحديث البيانات بنجاح");
            queryClient.setQueryData(["userData"], data.userData);
            // reset();
        },
    });
    return { isPending, updateDataMutate };
}
