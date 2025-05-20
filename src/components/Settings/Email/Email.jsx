/* eslint-disable no-unused-vars */
import PasswordChange from "./utils/PasswordChange";
import ProfileData from "./utils/ProfileData";
import { motion } from "framer-motion";
const Email = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-full h-full flex flex-col items-center justify-start py-8 overflow-auto font-sec">
                {/* Profile Data */}
                <ProfileData />
                {/* sep */}
                <div className="w-full h-[1.2px] bg-gray-400 my-4"></div>
                {/* Password */}
                <PasswordChange />
            </div>
        </motion.div>
    );
};

export default Email;
