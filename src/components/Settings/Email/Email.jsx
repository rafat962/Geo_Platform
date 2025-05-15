/* eslint-disable no-unused-vars */
import { Input } from "../../../shared/ui/Input";
import { cn } from "../../../lib/utils";
import { Label } from "../../../shared/ui/Lable";
import { Avatar, Button, ButtonBase } from "@mui/material";
import { HiOutlineTrash } from "react-icons/hi2";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useUpdateData } from "../hooks/useSettings";
import { useRef, useState } from "react";
import { backendImagesUrl } from "../../../environment/devolpmentApi";
import axiosInstance from "../../Auth/inceptron/axiosInstance";
const Email = () => {
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
            file:
                userData?.photo === "none"
                    ? "none"
                    : `${backendImagesUrl}/users/${userData?.photo}`,
        },
    });
    const watchName = watch("name");
    const watchEmail = watch("email");
    const watchPhoto = watch("file");
    console.log(userData?.photo);
    console.log(watchPhoto);
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
            onSuccess: (data) => {
                console.log(data);
            },
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
        console.log(response.data);
    }
    return (
        <div className="w-full h-full flex flex-col items-center justify-start py-8 overflow-auto font-sec">
            {/* profile */}
            <div className="grid grid-cols-4 w-full">
                {/* data container */}
                <form
                    onSubmit={handleSubmit(onSucses)}
                    className="col-span-3  w-full h-full grid grid-cols-5"
                >
                    {/* image */}
                    <div className="row-span-1 col-span-1 w-full flex flex-col items-center justify-center space-y-4">
                        <Avatar
                            src={file ? file : "/users/profile.png"}
                            sx={{ width: 160, height: 160 }}
                            className="scale-100 w-[56px] h-[56px]"
                        ></Avatar>
                        {/* image propertise */}
                        <div className="flex items-center justify-center space-x-2">
                            <button
                                onClick={() => fileRef.current.click()}
                                className="hover:text-blue-800 p-2 px-4 text-sm rounded-full  outline-2 outline-gray-400 cursor-pointer hover:bg-gray-200 trans "
                            >
                                تعديل الصورة
                            </button>
                            <input
                                ref={fileRef}
                                className=" hidden"
                                type="file"
                                onChange={(e) => handleUploadImage(e)}
                            />
                            <button
                                onClick={handleDeleteImage}
                                className="group p-2 px-4 text-lg rounded-full  outline-2 outline-gray-400 cursor-pointer hover:bg-gray-200 trans "
                            >
                                <HiOutlineTrash className=" group-hover:text-red-800 trans" />
                            </button>
                        </div>
                    </div>
                    {/* form data */}
                    <div className=" row-span-1 grid grid-cols-1 col-span-4  grid-rows-2  w-full">
                        {/* first row */}
                        <div className="col-span-1 flex items-center justify-center space-x-2">
                            <LabelInputContainer className=" relative">
                                <Label
                                    htmlFor="name"
                                    className="text-end text-md"
                                >
                                    الإسم
                                </Label>
                                <Input
                                    {...register("name")}
                                    className="text-end"
                                    id="name"
                                    placeholder="projectmayhem@fc.com"
                                    type="name"
                                />
                            </LabelInputContainer>
                        </div>
                        {/* seconde row */}
                        <div className="">
                            <LabelInputContainer className="mb-4">
                                <Label
                                    htmlFor="email"
                                    className="text-end text-md"
                                >
                                    الحساب
                                </Label>
                                <Input
                                    {...register("email")}
                                    className="text-end"
                                    id="email"
                                    placeholder="projectmayhem@fc.com"
                                    type="email"
                                />
                            </LabelInputContainer>
                        </div>
                    </div>
                    <div className=" my-4 row-span-1 w-full ">
                        <Button
                            disabled={
                                watchName === userData?.name &&
                                watchEmail === userData?.email &&
                                watchPhoto === userData?.photo &&
                                true
                            }
                            variant="contained"
                            className="w-full"
                            type="submit"
                        >
                            تحديث البيانات
                        </Button>
                    </div>
                </form>
                {/* data */}
                <div className="col-span-1 w-full h-full flex flex-col items-end space-y-1.5">
                    <h2 className="text-3xl font-semibold ">بيانات الحساب</h2>
                    <p className="text-md  text-gray-700">
                        يمكنك تغيير بيانات الحساب
                    </p>
                </div>
            </div>
            {/* Password */}
        </div>
    );
};

export default Email;
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
