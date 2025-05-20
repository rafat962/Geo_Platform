/* eslint-disable no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { Label } from "../../../../shared/ui/Lable";
import { Input } from "../../../../shared/ui/Input";
import { cn } from "../../../../lib/utils";
import { Button } from "@mui/material";
import { useUpdatePassword } from "../../hooks/useSettings";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
const PasswordChange = () => {
    // lan
    const { t } = useTranslation();
    const isRTL = i18next.language === "ar";
    // -----------
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            pastPassword: "",
            password: "",
            confirmPassword: "",
        },
    });

    const { isPending, updatePasswordMutate } = useUpdatePassword();

    const watchPassword = watch("password");
    const watchConfirmPassword = watch("confirmPassword");
    function onSucses(data) {
        updatePasswordMutate(data);
    }

    function onError(error) {
        console.error(error);
    }
    return (
        <div className="grid grid-cols-4 w-full">
            {/* data container */}
            <form
                onSubmit={handleSubmit(onSucses, onError)}
                className={`col-span-3 ${isRTL ? "order-1" : "order-2"} w-full h-full grid grid-cols-1 gap-y-4`}
            >
                {/* form data */}
                <div
                    className={`row-span-1 ${isRTL ? "order-1" : "order-1"} grid grid-cols-1 col-span-4 grid-rows-3 w-full`}
                >
                    {/* first row */}
                    <div className="col-span-1 flex items-center justify-center space-x-2">
                        <LabelInputContainer className="relative">
                            <Label
                                htmlFor="pastPassword"
                                className={`${isRTL ? "text-end" : "text-start"} text-md`}
                            >
                                {t("كلمة المرور الحالية")}
                            </Label>
                            <Input
                                {...register("pastPassword")}
                                className={`${isRTL ? "text-end" : "text-start"}`}
                                id="pastPassword"
                                placeholder="********"
                                type="password"
                            />
                        </LabelInputContainer>
                    </div>
                    {/* second row */}
                    <div className="col-span-1 flex items-center justify-center space-x-2">
                        <LabelInputContainer className="relative">
                            <Label
                                htmlFor="password"
                                className={`${isRTL ? "text-end" : "text-start"} text-md`}
                            >
                                {t("كلمة المرور الجديدة")}
                            </Label>
                            <Input
                                {...register("password")}
                                className={`${isRTL ? "text-end" : "text-start"}`}
                                id="password"
                                placeholder="********"
                                type="password"
                            />
                        </LabelInputContainer>
                    </div>
                    {/* third row */}
                    <div>
                        <LabelInputContainer className="mb-4">
                            <Label
                                htmlFor="confirmPassword"
                                className={`${isRTL ? "text-end" : "text-start"} text-md`}
                            >
                                {t("تأكيد كلمة المرور")}
                            </Label>
                            <Input
                                {...register("confirmPassword")}
                                className={`${isRTL ? "text-end" : "text-start"}`}
                                id="confirmPassword"
                                placeholder="********"
                                type="password"
                            />
                        </LabelInputContainer>
                    </div>
                    <Button
                        disabled={
                            watchPassword !== watchConfirmPassword ||
                            watchPassword?.length < 3 ||
                            watchConfirmPassword?.length < 3
                        }
                        variant="contained"
                        className="w-full"
                        type="submit"
                    >
                        {t("تحديث كلمة المرور")}
                    </Button>
                </div>
            </form>

            {/* data */}
            <div
                className={`col-span-1 ${isRTL ? "order-2 items-end" : "order-1 items-start"} w-full h-full flex flex-col space-y-1.5`}
            >
                <h2 className="text-3xl font-semibold">{t("كلمة المرور")}</h2>
                <p className="text-md text-gray-700">
                    {t("يمكنك تغيير كلمة المرور")}
                </p>
            </div>
        </div>
    );
};

export default PasswordChange;
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
