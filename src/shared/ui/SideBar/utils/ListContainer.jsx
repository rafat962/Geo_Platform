const ListContainer = ({ children }) => {
    return (
        <div className="trans flex flex-col items-end justify-start space-y-2  w-full">
            {children}
        </div>
    );
};

export default ListContainer;
