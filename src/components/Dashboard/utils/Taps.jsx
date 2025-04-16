import React from "react";
import Tap from "../../../shared/ui/Tap";

const Taps = () => {
    return (
        <div className="flex flex-wrap items-start justify-between w-full gap-3">
            {/* tap 1 */}
            <Tap
                imgPath="/Dashboard/buildings.png"
                bgColor="bg-amber-200 dark:bg-amber-600"
                textColor="text-amber-500 dark:text-amber-200"
                number="869"
                name="عدد المبانى السكنية"
            />
            {/* tap 2 */}
            <Tap
                imgPath="/Dashboard/school.png"
                bgColor="bg-cyan-200 dark:bg-cyan-600"
                textColor="text-cyan-500 dark:text-cyan-200"
                number="35"
                name="عدد المدارس"
            />
            {/* tap 3 */}
            <Tap
                imgPath="/Dashboard/hospital.png"
                bgColor="bg-red-200 dark:bg-red-600"
                textColor="text-red-500 dark:text-red-200"
                number="12"
                name="عدد المستشفيات"
            />
            {/* tap 4 */}
            <Tap
                imgPath="/Dashboard/shop.png"
                bgColor="bg-blue-200 dark:bg-blue-600"
                textColor="text-blue-500 dark:text-blue-200"
                number="55"
                name="عدد المراكز التجارية"
            />
        </div>
    );
};

export default Taps;
