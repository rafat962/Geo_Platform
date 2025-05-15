import axiosInstance from "../inceptron/axiosInstance";

const signUpApi = async (data) => {
    try {
        const response = await axiosInstance.post("users/signup", data);
        return response.data;
    } catch (err) {
        // Optionally handle errors here
        if (err.response) {
            return err.response.data; // if backend sends structured err
        }
        throw err; // otherwise rethrow
    }
};

const loginApi = async (data) => {
    try {
        const response = await axiosInstance.post(`users/login`, data);
        return response.data;
    } catch (err) {
        // Optionally handle errors here
        if (err.response) {
            return err.response.data; // if backend sends structured err
        }
        throw err; // otherwise rethrow
    }
};
const activeAccountApi = async (data) => {
    try {
        const response = await axiosInstance.post(`users/active`, data);
        return response.data;
    } catch (err) {
        // Optionally handle errors here
        if (err.response) {
            return err.response.data; // if backend sends structured err
        }
        throw err; // otherwise rethrow
    }
};

const verfyUser = async () => {
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axiosInstance.post("users/token", { token });
        return response;
    } catch (err) {
        // Optionally handle errors here
        if (err.response) {
            return err.response.data; // if backend sends structured err
        }
        throw err; // otherwise rethrow
    }
};

export { signUpApi, activeAccountApi, loginApi, verfyUser };
