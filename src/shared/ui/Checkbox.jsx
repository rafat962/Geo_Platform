/* eslint-disable no-unused-vars */
import React from "react";

const Checkbox = ({ lable, onClick, state }) => {
    return (
        <div class="flex items-center mb-4 mx-2">
            <input
                onClick={onClick}
                checked={state}
                id="default-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
                for="default-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
                {lable}
            </label>
        </div>
    );
};

export default Checkbox;
