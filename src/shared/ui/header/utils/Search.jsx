import { BiSearch } from "react-icons/bi";

const Search = () => {
    return (
        <div className="w-50 group focus-within:w-74  focus-within:bg-gray-300  trans px-2 py-2 flex items-center justify-start brightness-105 rounded-full bg-gray-200 space-x-2 drop-shadow-sm backdrop-blur-xl outline-1 outline-gray-300 shadow-2xs ">
            <span>
                <BiSearch className=" group-focus-within:text-blue-500 text-xl cursor-pointer hover:text-blue-500 trans" />
            </span>
            <input
                placeholder="البحث"
                type="text"
                className="w-full focus:outline-0"
            />
        </div>
    );
};

export default Search;
