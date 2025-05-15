import axiosInstance from "../../Auth/inceptron/axiosInstance";

const updateUserApi = async (data) => {
    try {
        const response = await axiosInstance.post(`users/updateUser`, data);
        return response.data;
    } catch (err) {
        // Optionally handle errors here
        if (err.response) {
            return err.response.data; // if backend sends structured err
        }
        throw err; // otherwise rethrow
    }
};

export { updateUserApi };
