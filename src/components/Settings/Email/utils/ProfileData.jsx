/* eslint-disable no-unused-vars */
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Input } from "../../../../shared/ui/Input";
import { cn } from "../../../../lib/utils";
import { Label } from "../../../../shared/ui/Lable";
import { Avatar, Button, ButtonBase } from "@mui/material";
import { HiOutlineTrash } from "react-icons/hi2";
import { useUpdateData } from "../../hooks/useSettings";
import { useRef, useState } from "react";
import { backendImagesUrl } from "../../../../environment/devolpmentApi";
import axiosInstance from "../../../Auth/inceptron/axiosInstance";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
const ProfileData = () => {
    // lan
    const { t } = useTranslation();
    const isRTL = i18next.language === "ar";
    // -----------
    const fileRef = useRef(null);
    const queryClient = useQueryClient();
    const userData = queryClient.getQueryData(["userData"]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            name: userData?.name,
            email: userData?.email,
            file: `${backendImagesUrl}/users/${userData?.photo}`,
        },
    });
    const watchName = watch("name");
    const watchEmail = watch("email");
    const watchPhoto = watch("file");
    const comparePhotoForValidation = `${backendImagesUrl}/users/${userData?.photo}`;
    const { isPending, updateDataMutate } = useUpdateData();
    const [file, setFile] = useState(
        `${backendImagesUrl}/users/${userData?.photo}`
    );
    function onSucses(data) {
        const { email, name, file } = data;
        const formData = new FormData();
        formData.append("email", email);
        formData.append("name", name);
        // Optional: only append if it's a new file
        if (file instanceof File) {
            formData.append("file", file);
        }
        // for (const pair of formData.entries()) {
        //     console.log(pair[0], pair[1]);
        // }
        updateDataMutate(formData, {
            onSuccess: (data) => {},
        });
    }
    function handleUploadImage(e) {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            const objectUrl = URL.createObjectURL(uploadedFile);
            setFile(objectUrl);
            setValue("file", uploadedFile);
        }
        // Allow re-selecting the same file again
        e.target.value = null;
    }
    // handle delete image
    async function handleDeleteImage() {
        setFile("/users/profile.png");
        setValue("file", "none");
        const response = await axiosInstance.post(`users/deleteImage`);
        queryClient.setQueryData(["userData"], {
            name: userData?.name,
            email: userData?.email,
            photo: "none",
        });
    }
    return (
        <div className="grid grid-cols-4 w-full">
            {/* data container */}
            <form
                onSubmit={handleSubmit(onSucses)}
                className={`col-span-3  ${isRTL ? "order-1" : "order-2"} w-full h-full grid grid-cols-5 gap-x-2`}
            >
                {/* image */}
                <div
                    className={`row-span-1 ${isRTL ? "order-1" : "order-2"} col-span-1   w-full flex flex-col items-center justify-center space-y-4`}
                >
                    <Avatar
                        src={file ? file : "/users/profile.png"}
                        sx={{ width: 160, height: 160 }}
                        className="scale-100 w-[56px] h-[56px]"
                    />
                    {/* image propertise */}
                    <div className="flex items-center justify-center space-x-2">
                        <button
                            type="button"
                            onClick={() => fileRef.current.click()}
                            className="hover:text-blue-800 p-2 px-4 text-sm rounded-full outline-2 outline-gray-400 cursor-pointer hover:bg-gray-200 trans"
                        >
                            {t("تعديل الصورة")}
                        </button>
                        <input
                            ref={fileRef}
                            className="hidden"
                            type="file"
                            onChange={(e) => handleUploadImage(e)}
                        />
                        <button
                            type="button"
                            onClick={handleDeleteImage}
                            className="group p-2 px-4 text-lg rounded-full outline-2 outline-gray-400 cursor-pointer hover:bg-gray-200 trans"
                        >
                            <HiOutlineTrash className="group-hover:text-red-800 trans" />
                        </button>
                    </div>
                </div>
                {/* form data */}
                <div
                    className={`row-span-1 ${isRTL ? "order-2" : "order-1"} grid grid-cols-1 col-span-4 grid-rows-2 w-full`}
                >
                    {/* first row */}
                    <div className="col-span-1 flex items-center justify-center space-x-2">
                        <LabelInputContainer className="relative">
                            <Label
                                htmlFor="name"
                                className={`${isRTL ? "text-end" : "text-start"}  text-md`}
                            >
                                {t("الإسم")}
                            </Label>
                            <Input
                                {...register("name")}
                                className={`${isRTL ? "text-end" : "text-start"}`}
                                id="name"
                                placeholder="projectmayhem@fc.com"
                                type="name"
                            />
                        </LabelInputContainer>
                    </div>
                    {/* second row */}
                    <div>
                        <LabelInputContainer className="mb-4">
                            <Label
                                htmlFor="email"
                                className={`${isRTL ? "text-end" : "text-start"}  text-md`}
                            >
                                {t("الحساب")}
                            </Label>
                            <Input
                                {...register("email")}
                                className={`${isRTL ? "text-end" : "text-start"}`}
                                id="email"
                                placeholder="projectmayhem@fc.com"
                                type="email"
                            />
                        </LabelInputContainer>
                    </div>
                </div>
                <div
                    className={`my-4  flex ${isRTL ? "justify-center" : "justify-end col-span-4"}  w-full order-3`}
                >
                    <Button
                        disabled={
                            watchName === userData?.name &&
                            watchEmail === userData?.email &&
                            watchPhoto === comparePhotoForValidation &&
                            true
                        }
                        variant="contained"
                        className="w-fit"
                        type="submit"
                    >
                        {t("تحديث البيانات")}
                    </Button>
                </div>
            </form>

            {/* data */}
            <div
                className={`col-span-1 ${isRTL ? "order-2 items-end" : "order-1 items-start"} w-full h-full flex flex-col  space-y-1.5`}
            >
                <h2 className="text-3xl font-semibold ">
                    {t("بيانات الحساب")}
                </h2>
                <p className="text-md text-gray-700">
                    {t("يمكنك تغيير بيانات الحساب")}
                </p>
            </div>
        </div>
    );
};

export default ProfileData;
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
