import React from "react";
import { useMap } from "../../../../shared/hooks/useMap";
import useView from "../../../../shared/hooks/useView";
import { billboards } from "../../helpers/billboard.StaticData";

const AddReq = () => {
    const { viewRef } = useMap(null);
    useView(viewRef, 11, [39.22, 21.45], "satellite", billboards);
    return (
        <div className="w-full h-full bg-sec rounded-4xl overflow-hidden">
            <div
                ref={viewRef}
                className={"w-full  h-90 overflow-hidden rounded-t-3xl "}
            ></div>
            <div class="flex items-center justify-center">
                <p class="flex justify-center  m-4 p-3 w-full font-semibold text-cyan-950 text-xl bg- opacity-80 shadow-2xl  dark:font-semibold dark:text-neutral-300 dark:bg-opacity-50 rounded-xl dark:bg-slate-700 dark:shadow-2xl">
                    ADD REQUEST
                </p>
            </div>
            <div>
                <div class="flex justify-between items-center w-full  px-25 ">
                    <button
                        onclick="showStep(0)"
                        id="step0"
                        class="flex flex-col items-center text-orange-600"
                    >
                        <div class="w-8 h-8 flex items-center justify-center rounded-full border-2 border-orange-600 hover:bg-gray-300">
                            i
                        </div>
                        <span class="text-sm mt-1 hover:font-bold">
                            Personal Information
                        </span>
                    </button>
                    <button
                        onclick="showStep(1)"
                        id="step1"
                        class="flex flex-col items-center text-gray-400"
                    >
                        <div class="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 hover:bg-gray-300 ">
                            🪧
                        </div>
                        <span class="text-sm mt-1 hover:font-bold">
                            billboard Details
                        </span>
                    </button>
                    <button
                        onclick="showStep(2)"
                        id="step2"
                        class="flex flex-col items-center text-gray-400"
                    >
                        <div class="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 hover:bg-gray-300">
                            💳
                        </div>
                        <span class="text-sm mt-1 hover:font-bold">
                            Payment
                        </span>
                    </button>
                </div>
                <div class="px-10 bg-amber-300 w-full  flex flex-wrap justify-between items-center gap-2">
                    <div class="overflow-auto bg-teal-50 h-100 w-100 rounded-2xl mb-3">
                        <div>
                            <form method="POST">
                                <div class="font-bold p-1  m-2 dark:text-gray-700">
                                    <label htmlFor="username">
                                        Client Name:
                                    </label>
                                    <input
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-center"
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="please enter your name"
                                        required
                                    />
                                </div>
                                <div class="font-bold p-1  m-2 dark:text-gray-700">
                                    <label htmlFor="email">
                                        Client E-mail:
                                    </label>
                                    <input
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-center"
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="please enter your email"
                                        required
                                    />
                                </div>

                                <div class="font-bold p-1  m-2 dark:text-gray-700">
                                    <label htmlFor="adress">Adress:</label>
                                    <textarea
                                        type="adress"
                                        id="adress"
                                        name="adress"
                                        placeholder="please enter your adress"
                                        required
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-center"
                                        rows={2}
                                    />
                                </div>

                                <div class="flex justify-center font-bold p-1  m-2 dark:text-gray-700">
                                    <button
                                        type="submit"
                                        className="w-25  p-2 mt-2 border border-gray-300 rounded-lg text-center bg-emerald-200 cursor-pointer transition ease-out duration-250  hover:bg-emerald-500 dark:text-neutral-600 shadow-2xl"
                                    >
                                        Next
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="overflow-auto bg-teal-50 h-100 w-100 rounded-2xl mb-3">
                        <div>
                            <form action="?????????????" method="POST">
                                <div class="font-bold p-1  m-2 dark:text-gray-700">
                                    <label htmlFor="city">city:</label>
                                    <input
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-center"
                                        type="text"
                                        id="city"
                                        name="city"
                                        placeholder="city"
                                        required
                                    />
                                </div>

                                <div class="font-bold p-1  m-2 dark:text-gray-700">
                                    <label htmlFor="Street Name">
                                        Street Name:
                                    </label>
                                    <input
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-center"
                                        type="text"
                                        id="Street Name"
                                        name="Street Name"
                                        placeholder="Street Name"
                                        required
                                    />
                                </div>

                                <div class="font-bold p-1  m-2 dark:text-gray-700">
                                    <label htmlFor="Billboard id">
                                        Billboard id:
                                    </label>
                                    <input
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-center"
                                        type="number"
                                        id="Billboard id"
                                        name="Billboard id"
                                        placeholder="please enter your Billboard id"
                                        required
                                    />
                                </div>

                                <div class="font-bold p-1  m-2 dark:text-gray-700">
                                    <label htmlFor="Billboard Size">
                                        Billboard Size:
                                    </label>
                                    <input
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-center"
                                        type="text"
                                        id="billboard_size"
                                        name="billboard_size"
                                        placeholder="please enter your billboard size"
                                        required
                                    />
                                </div>

                                <div class="font-bold p-1  m-2 dark:text-gray-700">
                                    <label htmlFor="Billboard type">
                                        Billboard type:
                                    </label>
                                    <select
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-center"
                                        id="Billboard type"
                                        name="Billboard type"
                                        placeholder="please enter your Billboard type"
                                        required
                                    >
                                        <option value="ثابتة">ثابتة</option>
                                        <option value="رقمية">رقمية</option>
                                        <option value="دوارة">دوارة</option>
                                        <option value="اخرى">اخرى</option>
                                    </select>
                                </div>

                                <div class="font-bold p-1  m-2 dark:text-gray-700">
                                    <label htmlFor="Billboard Oriantaion">
                                        Billboard Oriantaion:
                                    </label>
                                    <select
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-center"
                                        id="Billboard Oriantaion"
                                        name="Billboard Oriantaion"
                                        placeholder="please enter your Billboard Oriantaion"
                                        required
                                    >
                                        <option value="شمال">شمال</option>
                                        <option value="جنوب">جنوب</option>
                                        <option value="شارع داخلي">
                                            شارع داخلي
                                        </option>
                                        <option value="مزدوج">مزدوج</option>
                                    </select>
                                </div>

                                <div class="font-bold p-1  m-2 dark:text-gray-700">
                                    <label htmlFor="Billboard status">
                                        Billboard status:
                                    </label>
                                    <select
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-center"
                                        id="Billboard status"
                                        name="Billboard status"
                                        placeholder="please enter your Billboard status"
                                        required
                                    >
                                        <option value="نشطة">نشطة</option>
                                        <option value="قيد الصيانة">
                                            قيد الصيانة
                                        </option>
                                        <option value="معطلة">معطلة</option>
                                    </select>
                                </div>

                                <div class="font-bold p-1  m-2 dark:text-gray-700">
                                    <label htmlFor="long">long:</label>
                                    <input
                                        type="number"
                                        id="long"
                                        name="long"
                                        placeholder="please enter x"
                                        required
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-center"
                                    />
                                </div>

                                <div class="font-bold p-1  m-2 dark:text-gray-700">
                                    <label htmlFor="lat">lat:</label>
                                    <input
                                        type="number"
                                        id="lat"
                                        name="lat"
                                        placeholder="please enter y"
                                        required
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-center"
                                    />
                                </div>

                                <div class="font-bold p-1  m-2 dark:text-gray-700">
                                    <label htmlFor="image">image:</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="image"
                                        name="image"
                                        placeholder="please enter the image"
                                        required
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-center"
                                    />
                                </div>

                                <div class="font-bold p-1  m-2 dark:text-gray-700 ">
                                    <label htmlFor="billboard rent date">
                                        billboard rent date:
                                    </label>
                                    <div class="m-2 font-semibold">
                                        <label
                                            htmlFor="from"
                                            class="m-2 font-medium"
                                        >
                                            from:
                                        </label>
                                        <input
                                            type="date"
                                            id="from"
                                            name="from"
                                            placeholder="DD/MM/YY"
                                            required
                                            className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-center "
                                        />
                                        <label
                                            htmlFor="to"
                                            class="m-2 font-medium"
                                        >
                                            to:
                                        </label>
                                        <input
                                            type="date"
                                            id="to"
                                            name="to"
                                            placeholder="DD/MM/YY"
                                            required
                                            className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-center"
                                        />
                                    </div>
                                </div>

                                <div class="font-bold p-1  m-2 dark:text-gray-700">
                                    <label htmlFor="Notes">Notes:</label>
                                    <textarea
                                        type="Notes"
                                        id="Notes"
                                        name="Notes"
                                        placeholder="please enter your Notes"
                                        required
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-center "
                                        rows={3}
                                    />
                                </div>

                                <div class="flex justify-center font-bold p-1  m-2 dark:text-gray-700">
                                    <button
                                        type="submit"
                                        className="w-25  p-2 mt-2 border border-gray-300 rounded-lg text-center bg-emerald-300 cursor-pointer transition ease-out duration-250  hover:bg-emerald-500 dark:text-neutral-600 shadow-2xl"
                                    >
                                        Next
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="overflow-auto bg-teal-50 h-100 w-100 rounded-2xl mb-3">
                        <div>
                            <form action="billboardsReq/AddReq" method="POST">
                                <div class="font-bold p-1  m-2 dark:text-gray-700">
                                    <label htmlFor="Card Number">
                                        Card Number:
                                    </label>
                                    <input
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-center"
                                        type="number"
                                        id="Card Number"
                                        name="Card Number"
                                        placeholder="0125 5451 3265 4545"
                                        maxLength={19}
                                        required
                                    />
                                </div>
                                <div class="font-bold p-1  m-2 dark:text-gray-700">
                                    <label htmlFor="expiry">Expiry Date</label>
                                    <input
                                        type="text"
                                        id="expiry"
                                        name="expiry"
                                        placeholder="MM/YY"
                                        required
                                        maxLength={5}
                                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-center"
                                    />
                                </div>
                                <div>
                                    <div class="font-bold p-1  m-2 dark:text-gray-700">
                                        <label
                                            htmlFor="cvv"
                                            className="block font-medium mb-1"
                                        >
                                            CVV
                                        </label>
                                        <input
                                            type="password"
                                            id="cvv"
                                            name="cvv"
                                            placeholder="123"
                                            required
                                            maxLength={4}
                                            className="w-full p-2 mt-2 border border-gray-300 rounded-lg text-center"
                                        />
                                    </div>
                                </div>

                                <div class="flex justify-center font-bold p-1  m-2 dark:text-gray-700">
                                    <button
                                        type="submit"
                                        className="w-25  p-2 mt-2 border border-gray-300 rounded-lg text-center bg-emerald-500 cursor-pointer transition ease-out duration-250  hover:bg-emerald-700 dark:text-neutral-600 shadow-2xl"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddReq;
